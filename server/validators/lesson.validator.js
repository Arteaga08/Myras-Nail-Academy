import { z } from 'zod';

const httpUrl = z
  .string()
  .url()
  .refine((val) => /^https?:\/\//.test(val), { message: 'URL must use http or https protocol' });

const createLessonSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  order: z.number({ required_error: 'Video number (order) is required' }).int().min(1),
  description: z.string().optional().nullable(),
  videoUrl: httpUrl,
  duration: z.number().min(0).optional(),
  isFree: z.boolean().optional(),
  resources: z
    .array(
      z.object({
        name: z.string().min(1, 'Resource name is required'),
        url: httpUrl,
      })
    )
    .optional(),
});

const updateLessonSchema = createLessonSchema.partial();

export { createLessonSchema, updateLessonSchema };
