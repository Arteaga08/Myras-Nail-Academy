import { z } from 'zod';

const createCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required').max(100),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .toLowerCase()
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  description: z.string().optional().nullable(),
});

const updateCategorySchema = createCategorySchema.partial();

export { createCategorySchema, updateCategorySchema };
