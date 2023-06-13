import { Router } from "express";
import { login, register } from "../controllers/auth";
import { validationMiddleware } from "../middleware/validationMiddleware";
import { authValidation, nameValidation } from "../middleware/auth";

export const authRouter = Router();

authRouter.post("/login", authValidation, validationMiddleware, login);

authRouter.post(
  "/register",
  authValidation,
  nameValidation,
  validationMiddleware,
  register
);
