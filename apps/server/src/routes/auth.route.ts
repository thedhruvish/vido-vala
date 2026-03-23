import { Router } from "express";
import * as AuthController from "../controllers/auth.controller";
import { validate } from "../middlwares/validate.middlware";
import {
  googleLoginValidator,
  loginValidator,
  otpResendValidator,
  otpVerifyValidator,
  registerValidator,
} from "@vido-vala/validators";

const router: Router = Router();

router.post("/register", validate(registerValidator), AuthController.register);

router.post("/login", validate(loginValidator), AuthController.login);
router.post("/google", validate(googleLoginValidator), AuthController.googleLogin);
router.post("/otp-resend", validate(otpResendValidator), AuthController.resendOtp);
router.post("/otp-verify", validate(otpVerifyValidator), AuthController.verifyOtp);
router.post("/logout", AuthController.logout);

export default router;
