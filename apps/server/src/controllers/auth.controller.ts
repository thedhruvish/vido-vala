import type { Request, Response } from "express";
import * as AuthService from "../services/auth.service";
import { sendResponse } from "../utils/response-handler";

const COOKIE_NAME = "sessionId";
const isProduction = process.env.NODE_ENV === "production";

export const register = async (req: Request, res: Response) => {
  await AuthService.register(req.body);
  sendResponse(res, 201, "User registered successfully, please verify OTP", {
    email: req.body.email,
  });
};

export const login = async (req: Request, res: Response) => {
  const user = await AuthService.login(req.body);
  const sessionId = await AuthService.createSession(user.id);

  res.cookie(COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: isProduction,
    signed: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  sendResponse(res, 200, "Login successful", { user });
};

export const googleLogin = async (req: Request, res: Response) => {
  const user = await AuthService.googleLogin(req.body.idToken);
  const sessionId = await AuthService.createSession(user.id);

  res.cookie(COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: isProduction,
    signed: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  sendResponse(res, 200, "Google login successful", { user });
};

export const resendOtp = async (req: Request, res: Response) => {
  await AuthService.resendOtp(req.body.email);
  sendResponse(res, 200, "OTP resent successfully");
};

export const verifyOtp = async (req: Request, res: Response) => {
  await AuthService.verifyOtp(req.body.email, req.body.otp);
  sendResponse(res, 200, "OTP verified successfully");
};

export const logout = async (_req: Request, res: Response) => {
  res.clearCookie(COOKIE_NAME);
  sendResponse(res, 200, "Logout successful");
};
