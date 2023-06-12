import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req);

  const errors = validationResult(req);

  console.log(errors);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  next();
};
