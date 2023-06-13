"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const validateJWT = (request, response, next) => {
    var _a;
    const token = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    const secret = process.env.JWT_SECRET;
    if (token) {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        return response.status(401);
    }
    next();
};
exports.validateJWT = validateJWT;
