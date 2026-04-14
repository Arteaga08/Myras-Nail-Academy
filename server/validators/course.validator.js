import { z } from 'zod';

const createCourseSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(1, 'Description is required'),
  shortDescription: z.string().max(200).optional().nullable(),
  price: z.number({ required_error: 'Price is required' }).min(0, 'Price cannot be negative'),
  isOnSale: z.boolean().optional(),
  salePrice: z.number().min(0).optional().nullable(),
  thumbnail: z.string().url('Invalid thumbnail URL').optional().nullable(),
  previewVideoUrl: z.string().url('Invalid preview video URL').optional().nullable(),
  category: z.string().optional().nullable(),
  isPublished: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});

const updateCourseSchema = createCourseSchema.partial();

export { createCourseSchema, updateCourseSchema };
