import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllPosts = async (request: Request, response: Response) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: request.body.user.id,
      },
    });

    response.status(200).json(posts);
  } catch (error) {
    response.status(400).json({ message: "failed to get posts" });
  }
};

export const createPost = async (request: Request, response: Response) => {
  const { content, title, user } = request.body;

  try {
    if (!content || !title) {
      return response
        .status(400)
        .json({ message: "content and title is required" });
    }

    if (user) {
      const post = await prisma.post.create({
        data: {
          content,
          title,
          authorId: user.id,
        },
      });
      return response.status(200).json(post);
    }

    return response.status(400).json({ message: "any error" });
  } catch (error) {
    response.status(400).json({ message: "failed to create posts" });
  }
};

export const editPost = (request: Request, response: Response) => {
  const { title, content } = request.body;

  if (!title || !content) {
    return response
      .status(400)
      .json({ message: "content and title is required" });
  }

  return response.status(200).json({ title, content });
};
