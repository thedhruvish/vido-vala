import { z } from "zod";

export const createWatchHistoryValidator = z.object({
  videoId: z.number().int(),
  videoSecond: z.number().int().nonnegative().optional(),
});

export const updateWatchHistoryValidator = z.object({
  videoSecond: z.number().int().nonnegative(),
});
