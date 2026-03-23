import { z } from "zod";

export const loginValidator = z.object({
  email: z.email(),
  password: z.string(),
});
export const registerValidator = loginValidator.extend({
  name: z.string().min(2),
});

export const googleLoginValidator = z.object({
  idToken: z.string(),
});

export const otpResendValidator = z.object({
  email: z.email(),
});

export const otpVerifyValidator = otpResendValidator.extend({
  otp: z.string().length(6),
});
