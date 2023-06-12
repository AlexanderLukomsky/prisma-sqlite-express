import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const login = async (request: Request, response: Response) => {
  const { email, password } = request.body;

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (user) {
    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (isCorrectPassword) {
      return response.status(200).json({
        name: user.name,
        email: user.email,
        id: user.id,
      });
    }
  }

  return response.status(401).json({ message: "incorrect login or password" });
};

export const register = async (request: Request, response: Response) => {
  const { name, email, password } = request.body;

  const isRegisteredUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (isRegisteredUser) {
    return response.status(400).json({ message: "user already registered" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  response.send("register");
};
