import { Request, Response, Router } from "express";
import { validateJWT } from "../middleware/auth";
import { createPost, getAllPosts } from "../controllers/posts";

export const postsRouter = Router();

postsRouter.get("/", validateJWT, getAllPosts);

postsRouter.get(
  "/:id",
  validateJWT,
  (request: Request, response: Response) => {}
);

postsRouter.post("/create", validateJWT, createPost);

postsRouter.put(
  "/edit/:id",
  validateJWT,
  (request: Request, response: Response) => {}
);

postsRouter.delete(
  "/remove/:id",
  validateJWT,
  (request: Request, response: Response) => {}
);
