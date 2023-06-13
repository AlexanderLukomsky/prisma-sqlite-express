"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editPost = exports.createPost = exports.getAllPosts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllPosts = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield prisma.post.findMany({
            where: {
                authorId: request.body.user.id,
            },
        });
        response.status(200).json(posts);
    }
    catch (error) {
        response.status(400).json({ message: "failed to get posts" });
    }
});
exports.getAllPosts = getAllPosts;
const createPost = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, title, user } = request.body;
    try {
        if (!content || !title) {
            return response
                .status(400)
                .json({ message: "content and title is required" });
        }
        if (user) {
            const post = yield prisma.post.create({
                data: {
                    content,
                    title,
                    authorId: user.id,
                },
            });
            return response.status(200).json(post);
        }
        return response.status(400).json({ message: "any error" });
    }
    catch (error) {
        response.status(400).json({ message: "failed to create posts" });
    }
});
exports.createPost = createPost;
const editPost = (request, response) => {
    const { title, content } = request.body;
    if (!title || !content) {
        return response
            .status(400)
            .json({ message: "content and title is required" });
    }
    return response.status(200).json({ title, content });
};
exports.editPost = editPost;
