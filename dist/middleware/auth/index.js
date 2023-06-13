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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nameValidation = exports.authValidation = exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const express_validator_1 = require("express-validator");
const prisma = new client_1.PrismaClient();
const validateJWT = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    const secret = process.env.JWT_SECRET;
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, secret);
            const user = yield prisma.user.findUnique({
                where: {
                    id: decoded.id,
                },
            });
            request.body.user = user;
            next();
        }
        catch (error) {
            return response.status(401).json({ message: "unauthorized" });
        }
        return;
    }
    return response.status(401).json("unauthorized");
});
exports.validateJWT = validateJWT;
exports.authValidation = [
    (0, express_validator_1.check)("email")
        .exists()
        .withMessage("email is required")
        .bail()
        .isLength({ min: 3 })
        .withMessage("wrong email length")
        .bail()
        .isEmail()
        .withMessage("email not valid"),
    (0, express_validator_1.check)("password").exists().withMessage("password is required"),
];
exports.nameValidation = (0, express_validator_1.check)("name")
    .exists()
    .withMessage("name is required");
