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
exports.register = exports.login = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const login = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = request.body;
    const user = yield prisma.user.findFirst({
        where: {
            email,
        },
    });
    if (user) {
        const isCorrectPassword = yield bcrypt_1.default.compare(password, user.password);
        if (isCorrectPassword) {
            return response.status(200).json({
                name: user.name,
                email: user.email,
                id: user.id,
            });
        }
    }
    return response.status(401).json({ message: "incorrect login or password" });
});
exports.login = login;
const register = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = request.body;
    const isRegisteredUser = yield prisma.user.findFirst({
        where: {
            email,
        },
    });
    if (isRegisteredUser) {
        return response.status(400).json({ message: "user already registered" });
    }
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(password, salt);
    const newUser = yield prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });
    response.send("register");
});
exports.register = register;
