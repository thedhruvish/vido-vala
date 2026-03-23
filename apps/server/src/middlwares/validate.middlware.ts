import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/response-handler";

export const validate = (schema: any) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const validatedBody = await schema.parseAsync(req.body);
      req.body = validatedBody;
      next();
    } catch (error: any) {
      throw new ApiError(400, "Validation Error", error.errors);
    }
  };
};

export const validateParams = (schema: any) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const validatedParams = await schema.parseAsync(req.params);
      req.params = validatedParams;
      next();
    } catch (error: any) {
      throw new ApiError(400, "Parameter Validation Error", error.errors);
    }
  };
};
