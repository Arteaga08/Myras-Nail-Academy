import mongoose from 'mongoose';
import asyncHandler from '../utils/asyncHandler.js';
import { reconcilePayment, RECONCILE_OUTCOME } from '../services/paymentReconciliationService.js';

// @desc    Reconcile a stuck Payment against Stripe's truth
// @route   POST /api/admin/orders/:paymentId/reconcile
// @access  Admin
const reconcileOrder = asyncHandler(async (req, res) => {
  const { paymentId } = req.params;

  if (!mongoose.isValidObjectId(paymentId)) {
    res.status(400);
    throw new Error('Invalid payment id');
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

export { reconcileOrder };
