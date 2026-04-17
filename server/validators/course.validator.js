import { z } from 'zod';
import { objectIdSchema } from './objectId.validator.js';

const httpUrl = z
  .string()
  .url()
  .refine((val) => /^https?:\/\//.test(val), { message: 'URL must use http or https protocol' });

const createCourseSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(1, 'Description is required'),
  shortDescription: z.string().max(200).optional().nullable(),
  price: z.number({ required_error: 'Price is required' }).min(0, 'Price cannot be negative'),
  isOnSale: z.boolean().optional(),
  salePrice: z.number().min(0).optional().nullable(),
  thumbnail: httpUrl.optional().nullable(),
  previewVideoUrl: httpUrl.optional().nullable(),
  category: objectIdSchema.optional().nullable(),
  isPublished: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});

const updateCourseSchema = createCourseSchema.partial();

export { createCourseSchema, updateCourseSchema };
