import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const validationMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    response.status(400).json({ errors: errors.array() });
    return;
  }

  next();
};
