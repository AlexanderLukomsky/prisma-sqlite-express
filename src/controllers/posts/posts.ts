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

export const getPost = async (request: Request, response: Response) => {
  const { id } = request.params;

  try {
    const post = await prisma.post.findFirst({ where: { id } });

    response.status(200).json(post);
  } catch (error) {
    response.status(400).json({ message: "failed to get post" });
  }
};

export const editPost = async (request: Request, response: Response) => {
  const { title, content, id } = request.body;

  if (!title || !content || !id) {
    return response
      .status(400)
      .json({ message: "content, title and id is required" });
  }

  try {
    const updatedPost = await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        content,
      },
    });
    return response.status(200).json(updatedPost);
  } catch (error) {
    response.status(400).json({ message: "failed to update posts" });
  }
};

export const removePost = async (request: Request, response: Response) => {
  const { id } = request.body;

  if (!id) {
    return response.status(400).json({ message: "id is required" });
  }

  try {
    await prisma.post.delete({
      where: {
        id,
      },
    });

    response.status(204).json({ message: "success removed" });
  } catch (error) {
    response.status(400).json({ message: "failed to remove posts" });
  }
};
