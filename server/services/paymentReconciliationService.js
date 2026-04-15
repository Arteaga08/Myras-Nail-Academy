import mongoose from 'mongoose';
import getStripe from '../config/stripe.js';
import Payment from '../models/Payment.js';
import Enrollment from '../models/Enrollment.js';
import User from '../models/User.js';
import Course from '../models/Course.js';
import { sendEnrollmentConfirmationEmail, notifyAdminNewEnrollment } from './notificationService.js';

const REUSABLE_INTENT_STATUSES = [
  'requires_payment_method',
  'requires_confirmation',
  'requires_action',
  'processing',
];

const REUSABLE_WINDOW_MS = 30 * 60 * 1000;

// Transactionally mark a Payment as 'paid' and create its Enrollment (idempotent).
// Returns { payment, enrollmentCreated } and fires notifications on first success.
// Used by both the Stripe webhook (payment_intent.succeeded) and the admin reconcile endpoint.
const markPaymentPaid = async (paymentIntent) => {
  const session = await mongoose.startSession();
  let enrollmentCreated = false;
  let paymentDoc;

  try {
    await session.withTransaction(async () => {
      paymentDoc = await Payment.findOneAndUpdate(
        { stripeIntentId: paymentIntent.id },
        { status: 'paid' },
        { returnDocument: 'after', session }
      );

      if (!paymentDoc) {
        const meta = paymentIntent.metadata || {};
        throw new Error(
          `Payment not found for intent ${paymentIntent.id} (userId=${meta.userId}, courseId=${meta.courseId})`
        );
      }

      const existing = await Enrollment.findOne({
        userId: paymentDoc.userId,
        courseId: paymentDoc.courseId,
      }).session(session);

      if (!existing) {
        await Enrollment.create(
          [
            {
              userId: paymentDoc.userId,
              courseId: paymentDoc.courseId,
              paymentId: paymentDoc._id,
              accessGranted: true,
            },
          ],
          { session }
        );
        enrollmentCreated = true;
      }
    });
  } finally {
    session.endSession();
  }

  if (enrollmentCreated) {
    const [user, course] = await Promise.all([
      User.findById(paymentDoc.userId),
      Course.findById(paymentDoc.courseId),
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
  }

  return { payment: paymentDoc, enrollmentCreated };
};

// Outcome kinds surfaced by reconcilePayment — controllers map these to HTTP codes.
const RECONCILE_OUTCOME = {
  ALREADY_PAID: 'already_paid',
  PAID: 'paid',
  FAILED: 'failed',
  IN_FLIGHT: 'in_flight',
};

// Fetch a Payment's Stripe intent and converge local state with Stripe's truth.
// Safety net for stuck 'pending' records when the webhook was never delivered.
const reconcilePayment = async (paymentId) => {
  const payment = await Payment.findById(paymentId);
  if (!payment) {
    const err = new Error('Payment not found');
    err.statusCode = 404;
    throw err;
  }

  const intent = await getStripe().paymentIntents.retrieve(payment.stripeIntentId);

  if (intent.status === 'succeeded') {
    if (payment.status === 'paid') {
      return { outcome: RECONCILE_OUTCOME.ALREADY_PAID, payment, intentStatus: intent.status };
    }
    const { payment: updated, enrollmentCreated } = await markPaymentPaid(intent);
    return {
      outcome: RECONCILE_OUTCOME.PAID,
      payment: updated,
      intentStatus: intent.status,
      enrollmentCreated,
    };
  }

  if (intent.status === 'canceled') {
    const updated = await Payment.findByIdAndUpdate(
      paymentId,
      { status: 'failed' },
      { returnDocument: 'after' }
    );
    return { outcome: RECONCILE_OUTCOME.FAILED, payment: updated, intentStatus: intent.status };
  }

  const ageMs = Date.now() - new Date(payment.createdAt).getTime();
  if (intent.status === 'requires_payment_method' && ageMs > REUSABLE_WINDOW_MS) {
    const updated = await Payment.findByIdAndUpdate(
      paymentId,
      { status: 'failed' },
      { returnDocument: 'after' }
    );
    return { outcome: RECONCILE_OUTCOME.FAILED, payment: updated, intentStatus: intent.status };
  }

  if (REUSABLE_INTENT_STATUSES.includes(intent.status)) {
    return { outcome: RECONCILE_OUTCOME.IN_FLIGHT, payment, intentStatus: intent.status };
  }

  return { outcome: RECONCILE_OUTCOME.IN_FLIGHT, payment, intentStatus: intent.status };
};

export { markPaymentPaid, reconcilePayment, RECONCILE_OUTCOME };
