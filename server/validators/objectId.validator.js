import { z } from 'zod';
import mongoose from 'mongoose';

const objectIdSchema = z.string().refine((val) => mongoose.isValidObjectId(val), {
  message: 'Invalid id',
});

// Schema for routes with a single :id param.
const idParamSchema = z.object({ id: objectIdSchema });

// Schema for the reconcile endpoint which uses :paymentId.
const paymentIdParamSchema = z.object({ paymentId: objectIdSchema });

export { objectIdSchema, idParamSchema, paymentIdParamSchema };
