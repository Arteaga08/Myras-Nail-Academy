import { z } from 'zod';
import { objectIdSchema } from './objectId.validator.js';

const createReviewSchema = z.object({
  rating: z
    .number({ required_error: 'Rating is required' })
    .int()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating cannot exceed 5'),
  comment: z.string().max(1000, 'Comment cannot exceed 1000 characters').optional().nullable(),
  courseId: objectIdSchema,
});

export { createReviewSchema };
