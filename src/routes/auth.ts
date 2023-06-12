import { Router } from "express";
import {
  authValidation,
  login,
  nameValidation,
  register,
} from "../controllers/auth";
import { validationMiddleware } from "../middleware/validationMiddleware";

export const userRouter = Router();

userRouter.post("/login", authValidation, validationMiddleware, login);

userRouter.post(
  "/register",
  authValidation,
  nameValidation,
  validationMiddleware,
  register
);
