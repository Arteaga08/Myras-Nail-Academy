import express from 'express';
import { createReview } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';
import validate from '../middleware/validateMiddleware.js';
import { createReviewSchema } from '../validators/review.validator.js';

const router = express.Router();

router.post('/', protect, validate(createReviewSchema), createReview);

export default router;
