import { env } from "@vido-vala/env/server";
import type { Response } from "express";

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public errors: any[] = [],
    public stack = "",
  ) {
    super(message);
    if (stack) {
      // oxlint-disable-next-line typescript/no-unnecessary-parameter-property-assignment
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export const sendResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: any = null,
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const sendError = (res: Response, error: any) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  const errors = error.errors || [];

  return res.status(statusCode).json({
    success: false,
    message,
    errors,
    stack: env.DEBUG ? error.stack : undefined,
  });
};
