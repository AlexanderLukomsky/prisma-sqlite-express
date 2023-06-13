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
exports.removePost = exports.editPost = exports.getPost = exports.createPost = exports.getAllPosts = void 0;
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
const getPost = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    try {
        const post = yield prisma.post.findFirst({ where: { id } });
        response.status(200).json(post);
    }
    catch (error) {
        response.status(400).json({ message: "failed to get post" });
    }
});
exports.getPost = getPost;
const editPost = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, id } = request.body;
    if (!title || !content || !id) {
        return response
            .status(400)
            .json({ message: "content, title and id is required" });
    }
    try {
        const updatedPost = yield prisma.post.update({
            where: {
                id,
            },
            data: {
                title,
                content,
            },
        });
        return response.status(200).json(updatedPost);
    }
    catch (error) {
        response.status(400).json({ message: "failed to update posts" });
    }
});
exports.editPost = editPost;
const removePost = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.body;
    if (!id) {
        return response.status(400).json({ message: "id is required" });
    }
    try {
        yield prisma.post.delete({
            where: {
                id,
            },
        });
        response.status(204).json({ message: "success removed" });
    }
    catch (error) {
        response.status(400).json({ message: "failed to remove posts" });
    }
});
exports.removePost = removePost;
