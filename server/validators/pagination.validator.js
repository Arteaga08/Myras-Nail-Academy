import { z } from 'zod';

// Shared pagination schema for all list endpoints (GET query params).
// Accepts strings from the URL and coerces to int within safe bounds.
const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).max(10000).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
}).passthrough();

export { paginationSchema };
