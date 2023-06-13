import { Request, Response, Router } from "express";
import { validateJWT } from "../middleware/auth";
import {
  createPost,
  editPost,
  getAllPosts,
  getPost,
  removePost,
} from "../controllers/posts";

export const postsRouter = Router();

postsRouter.get("/", validateJWT, getAllPosts);

postsRouter.get("/:id", validateJWT, getPost);

postsRouter.post("/create", validateJWT, createPost);

postsRouter.put("/edit", validateJWT, editPost);

postsRouter.delete("/remove", validateJWT, removePost);
