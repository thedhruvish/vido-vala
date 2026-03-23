import { z } from "zod";

export const idParamValidator = z.object({
  id: z.string().regex(/^\d+$/, "ID must be a number"),
});

export type IdParam = {
  id: string;
};

export const videoIdParamValidator = z.object({
  videoId: z.string().regex(/^\d+$/, "Video ID must be a number"),
});

export type VideoIdParam = {
  videoId: string;
};
