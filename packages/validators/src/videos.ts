import { z } from "zod";

export const UPLOAD_TYPE = ["ROW_VIDEO", "THUMBNAIL"] as const;

export const getUploadUrlValidator = z.object({
  size: z.number().int().positive(),
  contentType: z.string(),
  fileName: z.string(),
  type: z.enum(UPLOAD_TYPE),
});

export const createVideoValidator = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  thumbnail: z.string().min(1, "Thumbnail is required"),
  isPublish: z.boolean(),
  seconds: z.number().int().positive().optional(),
});

export const updateVideoValidator = createVideoValidator.partial();
