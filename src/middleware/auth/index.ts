import { NextFunction, Response } from "express";
import { Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { check } from "express-validator";

const prisma = new PrismaClient();

export const validateJWT = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers.authorization?.split(" ")[1];
  const secret = process.env.JWT_SECRET!;

  if (token) {
    try {
      const decoded = jwt.verify(token, secret) as JwtPayload;

      const user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
      });

      request.body.user = user;

      next();
    } catch (error) {
      return response.status(401).json({ message: "unauthorized" });
    }

    return;
  }

  return response.status(401).json("unauthorized");
};

export const authValidation = [
  check("email")
    .exists()
    .withMessage("email is required")
    .bail()
    .isLength({ min: 3 })
    .withMessage("wrong email length")
    .bail()
    .isEmail()
    .withMessage("email not valid"),
  check("password").exists().withMessage("password is required"),
];

export const nameValidation = check("name")
  .exists()
  .withMessage("name is required");
