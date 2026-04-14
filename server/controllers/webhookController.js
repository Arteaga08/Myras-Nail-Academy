import mongoose from 'mongoose';
import getStripe from '../config/stripe.js';
import Payment from '../models/Payment.js';
import Enrollment from '../models/Enrollment.js';
import User from '../models/User.js';
import Course from '../models/Course.js';
import { sendEnrollmentConfirmationEmail, notifyAdminNewEnrollment } from '../services/notificationService.js';

// @desc    Handle Stripe webhook events
// @route   POST /api/webhooks/stripe
// @access  Public (Stripe signature verified)
const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = getStripe().webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`❌ Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      const session = await mongoose.startSession();

      try {
        await session.withTransaction(async () => {
          const payment = await Payment.findOneAndUpdate(
            { stripeIntentId: paymentIntent.id },
            { status: 'paid' },
            { new: true, session }
          );

          if (!payment) {
            throw new Error(`Payment not found for intent: ${paymentIntent.id}`);
          }

          // Avoid duplicate enrollments
          const existing = await Enrollment.findOne({
            userId: payment.userId,
            courseId: payment.courseId,
          }).session(session);

          if (!existing) {
            await Enrollment.create(
              [
                {
                  userId: payment.userId,
                  courseId: payment.courseId,
                  paymentId: payment._id,
                  accessGranted: true,
                },
              ],
              { session }
            );
          }
        });

        // Send notifications outside transaction (non-critical)
        const [user, course] = await Promise.all([
          User.findById(paymentIntent.metadata.userId),
          Course.findById(paymentIntent.metadata.courseId),
        ]);

        if (user && course) {
          await sendEnrollmentConfirmationEmail({
            studentEmail: user.email,
            studentName: user.firstName,
            courseTitle: course.title,
          });

          await notifyAdminNewEnrollment({
            studentName: `${user.firstName} ${user.lastName}`,
            studentEmail: user.email,
            courseTitle: course.title,
            amount: paymentIntent.amount,
          });
        }

        console.log(`✅ Enrollment created for intent: ${paymentIntent.id}`);
      } finally {
        session.endSession();
      }
    } else if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object;
      await Payment.findOneAndUpdate(
        { stripeIntentId: paymentIntent.id },
        { status: 'failed' }
      );
      console.log(`⚠️  Payment failed for intent: ${paymentIntent.id}`);
    } else if (event.type === 'payment_intent.canceled') {
      const paymentIntent = event.data.object;
      await Payment.findOneAndUpdate(
        { stripeIntentId: paymentIntent.id },
        { status: 'failed' }
      );
      console.log(`⚠️  Payment canceled for intent: ${paymentIntent.id}`);
    } else if (event.type === 'charge.refunded') {
      const charge = event.data.object;
      if (charge.payment_intent) {
        await Payment.findOneAndUpdate(
          { stripeIntentId: charge.payment_intent },
          { status: 'refunded' }
        );
        console.log(`💸 Payment refunded for intent: ${charge.payment_intent}`);
      }
    }
  } catch (err) {
    console.error(`❌ Webhook processing error: ${err.message}`);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }

  res.status(200).json({ received: true });
};

export { handleStripeWebhook };
