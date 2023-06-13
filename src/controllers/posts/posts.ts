import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllPosts = async (request: Request, response: Response) => {
  try {
    const posts = await prisma.post.findMany();
    console.log(posts);

    response.status(200).json(posts);
  } catch (error) {
    response.status(400).json({ message: "failed to get posts" });
  }
};

export const createPost = async (request: Request, response: Response) => {
  try {
    const author = await prisma.user.findFirst({
      where: {
        id: request.body.user.id,
      },
    });

    if (author) {
      const post = await prisma.post.create({
        data: {
          content: "content",
          title: "title",
          author: {
            connect: {
              id: author.id,
            },
          },
        },
      });
      return response.status(200).json(post);
    }

    return response.status(400).json({ message: "any error" });
  } catch (error) {
    console.log(error);

    response.status(400).json({ message: "failed to get posts" });
  }
};
