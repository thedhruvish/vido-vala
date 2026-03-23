import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/response-handler";

export const validate = (schema: any) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const validatedBody = await schema.parseAsync(req.body);
      req.body = validatedBody;
      next();
    } catch (error: any) {
      // Re-throw to global handler with structured error
      throw new ApiError(400, "Validation Error", error.errors);
    }
  };
};
