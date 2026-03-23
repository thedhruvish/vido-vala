import { z } from "zod";

export const createVideoValidator = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  thumbnail: z.string().url().optional(),
  isPublish: z.boolean().default(false),
  seconds: z.number().int().positive().optional(),
});

export const updateVideoValidator = createVideoValidator.partial();
