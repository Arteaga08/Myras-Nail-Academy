import { z } from 'zod';
import { objectIdSchema } from './objectId.validator.js';

const createOrderSchema = z.object({
  courseId: objectIdSchema,
});

export { createOrderSchema };
