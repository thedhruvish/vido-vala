import "dotenv/config";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    CORS_ORIGIN: z.url(),
    COOKIE_SECRET: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    DEBUG: z
      .string()
      .transform((v) => v === "true")
      .default("false"),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
