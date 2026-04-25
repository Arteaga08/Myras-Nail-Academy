import express from 'express';
import { createOrder, getOrderById, confirmOrder } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
import validate from '../middleware/validateMiddleware.js';
import { createOrderSchema } from '../validators/order.validator.js';
import { paymentIdParamSchema } from '../validators/objectId.validator.js';

const router = express.Router();

router.post('/', protect, validate(createOrderSchema), createOrder);
router.post('/:paymentId/confirm', protect, validate(paymentIdParamSchema, 'params'), confirmOrder);
router.get('/:id', protect, getOrderById);

export default router;
