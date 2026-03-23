import { z } from "zod";

export const createUserValidator = z.object({
  name: z.string().min(2),
  userName: z.string().min(3).optional(),
  picture: z.string().optional().nullable(),
  banner: z.string().optional().nullable(),
});

export const updateUserValidator = createUserValidator.partial();
