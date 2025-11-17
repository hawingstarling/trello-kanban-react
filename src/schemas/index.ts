import { z } from 'zod';

export const cardDescriptionSchema = z.object({
  description: z.string().min(1, 'Description is required'),
});

export type CardDescriptionForm = z.infer<typeof cardDescriptionSchema>;
