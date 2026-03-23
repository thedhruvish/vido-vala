import { z } from "zod";

export const createCommentValidator = z.object({
  videoId: z.number().int(),
  content: z.string().min(1),
  replyCommentId: z.number().int().optional().nullable(),
});

export const updateCommentValidator = z.object({
  content: z.string().min(1),
});
