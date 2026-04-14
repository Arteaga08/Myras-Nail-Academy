import { z } from 'zod';

const createOrderSchema = z.object({
  courseId: z.string().min(1, 'Course ID is required'),
});

export { createOrderSchema };
