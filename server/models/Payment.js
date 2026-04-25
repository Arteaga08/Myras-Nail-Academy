import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    stripeIntentId: {
      type: String,
      required: [true, 'Stripe intent ID is required'],
      unique: true,
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
    },
    currency: {
      type: String,
      default: 'mxn',
      lowercase: true,
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Course reference is required'],
    },
    webhookEventId: {
      type: String,
      sparse: true,
    },
  },
  { timestamps: true }
);

paymentSchema.index({ userId: 1, status: 1 });
paymentSchema.index({ webhookEventId: 1 }, { sparse: true });

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
