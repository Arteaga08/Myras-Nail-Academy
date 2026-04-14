import express from 'express';
import { createOrder, getOrderById } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
import validate from '../middleware/validateMiddleware.js';
import { createOrderSchema } from '../validators/order.validator.js';

const router = express.Router();

router.post('/', protect, validate(createOrderSchema), createOrder);
router.get('/:id', protect, getOrderById);

export default router;
