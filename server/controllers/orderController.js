import crypto from 'crypto';
import asyncHandler from '../utils/asyncHandler.js';
import Course from '../models/Course.js';
import Payment from '../models/Payment.js';
import Enrollment from '../models/Enrollment.js';
import getStripe from '../config/stripe.js';
import { reconcilePayment, RECONCILE_OUTCOME } from '../services/paymentReconciliationService.js';

const REUSABLE_INTENT_STATUSES = [
  'requires_payment_method',
  'requires_confirmation',
  'requires_action',
  'processing',
];

// @desc    Create a Stripe Payment Intent for a course
// @route   POST /api/orders
// @access  Protected
const createOrder = asyncHandler(async (req, res) => {
  const { courseId } = req.body;

  const course = await Course.findOne({ _id: courseId, isPublished: true });
  if (!course) {
    res.status(404);
    throw new Error('Course not found or not available');
  }

  // Check if already enrolled
  const alreadyEnrolled = await Enrollment.findOne({
    userId: req.user._id,
    courseId,
    accessGranted: true,
  });
  if (alreadyEnrolled) {
    res.status(400);
    throw new Error('You are already enrolled in this course');
  }

  // Use effectivePrice (sale price if on sale, otherwise regular price)
  const amountInCents = Math.round(course.effectivePrice * 100);

  // Reuse a recent pending PaymentIntent if one exists (prevents duplicates on retries)
  const recentPending = await Payment.findOne({
    userId: req.user._id,
    courseId,
    status: 'pending',
    createdAt: { $gte: new Date(Date.now() - 30 * 60 * 1000) },
  }).sort({ createdAt: -1 });

  if (recentPending) {
    const existingIntent = await getStripe().paymentIntents.retrieve(recentPending.stripeIntentId);
    if (REUSABLE_INTENT_STATUSES.includes(existingIntent.status)) {
      return res.status(200).json({
        status: 'success',
        data: {
          clientSecret: existingIntent.client_secret,
          paymentId: recentPending._id,
          amount: recentPending.amount,
          currency: recentPending.currency,
          reused: true,
        },
      });
    }
  }

  // Create Stripe Payment Intent with idempotency key
  const idempotencyKey = crypto.randomUUID();
  const paymentIntent = await getStripe().paymentIntents.create(
    {
      amount: amountInCents,
      currency: 'mxn',
      automatic_payment_methods: { enabled: true, allow_redirects: 'never' },
      metadata: {
        courseId: courseId.toString(),
        userId: req.user._id.toString(),
        courseTitle: course.title,
      },
    },
    { idempotencyKey }
  );

  // Create pending Payment record
  const payment = await Payment.create({
    stripeIntentId: paymentIntent.id,
    amount: amountInCents,
    currency: 'mxn',
    status: 'pending',
    userId: req.user._id,
    courseId,
  });

  res.status(201).json({
    status: 'success',
    data: {
      clientSecret: paymentIntent.client_secret,
      paymentId: payment._id,
      amount: amountInCents,
      currency: 'mxn',
    },
  });
});

// @desc    Get a single order by ID
// @route   GET /api/orders/:id
// @access  Protected
const getOrderById = asyncHandler(async (req, res) => {
  const payment = await Payment.findOne({
    _id: req.params.id,
    userId: req.user._id,
  }).populate('courseId', 'title thumbnail');

  if (!payment) {
    res.status(404);
    throw new Error('Order not found');
  }

  res.status(200).json({ status: 'success', data: payment });
});

// @desc    Confirm/reconcile a payment against Stripe (client-side fallback when webhooks fail)
// @route   POST /api/orders/:paymentId/confirm
// @access  Protected — student must own the payment
const confirmOrder = asyncHandler(async (req, res) => {
  const { paymentId } = req.params;

  const payment = await Payment.findOne({ _id: paymentId, userId: req.user._id });
  if (!payment) {
    res.status(404);
    throw new Error('Payment not found');
  }

  const result = await reconcilePayment(paymentId);

  const httpStatus = result.outcome === RECONCILE_OUTCOME.IN_FLIGHT ? 409 : 200;

  res.status(httpStatus).json({
    status: 'success',
    data: {
      outcome: result.outcome,
      intentStatus: result.intentStatus,
      enrollmentCreated: result.enrollmentCreated ?? false,
      payment: result.payment,
    },
  });
});

export { createOrder, getOrderById, confirmOrder };
