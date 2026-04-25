import getStripe from '../config/stripe.js';
import Payment from '../models/Payment.js';
import Enrollment from '../models/Enrollment.js';
import { markPaymentPaid } from '../services/paymentReconciliationService.js';

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

  const intentId = event.data?.object?.id;
  console.log(`📨 Stripe event received: type=${event.type} id=${event.id} intent=${intentId ?? 'n/a'}`);

  // Deduplication: if this event was already processed, skip it safely.
  // Stripe retries webhooks for up to 5 days on 5xx responses.
  const alreadyProcessed = await Payment.findOne({ webhookEventId: event.id });
  if (alreadyProcessed) {
    console.log(`⏭️  Duplicate webhook skipped: event=${event.id}`);
    return res.status(200).json({ received: true });
  }

  try {
    if (event.type === 'payment_intent.succeeded') {
      const { enrollmentCreated } = await markPaymentPaid(event.data.object);
      await Payment.findOneAndUpdate(
        { stripeIntentId: event.data.object.id },
        { webhookEventId: event.id }
      );
      console.log(
        `✅ Payment paid for intent ${event.data.object.id} (enrollmentCreated=${enrollmentCreated})`
      );
    } else if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object;
      await Payment.findOneAndUpdate(
        { stripeIntentId: paymentIntent.id },
        { status: 'failed', webhookEventId: event.id }
      );
      console.log(`⚠️  Payment failed for intent: ${paymentIntent.id}`);
    } else if (event.type === 'payment_intent.canceled') {
      const paymentIntent = event.data.object;
      await Payment.findOneAndUpdate(
        { stripeIntentId: paymentIntent.id },
        { status: 'failed', webhookEventId: event.id }
      );
      console.log(`⚠️  Payment canceled for intent: ${paymentIntent.id}`);
    } else if (event.type === 'charge.refunded') {
      const charge = event.data.object;
      if (charge.payment_intent) {
        const payment = await Payment.findOneAndUpdate(
          { stripeIntentId: charge.payment_intent },
          { status: 'refunded', webhookEventId: event.id },
          { new: true }
        );
        if (payment) {
          await Enrollment.findOneAndUpdate(
            { paymentId: payment._id },
            { accessGranted: false }
          );
          console.log(`🚫 Access revoked for enrollment (paymentId=${payment._id})`);
        }
        console.log(`💸 Payment refunded for intent: ${charge.payment_intent}`);
      }
    }
  } catch (err) {
    console.error(
      `❌ Webhook processing error (event=${event.id} type=${event.type} intent=${intentId ?? 'n/a'}): ${err.message}`
    );
    return res.status(500).json({ error: 'Webhook processing failed' });
  }

  res.status(200).json({ received: true });
};

export { handleStripeWebhook };
