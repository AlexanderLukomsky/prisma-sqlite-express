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
exports.register = exports.login = exports.authValidation = void 0;
const express_validator_1 = require("express-validator");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.authValidation = [
    (0, express_validator_1.oneOf)([
        (0, express_validator_1.check)("email")
            .exists()
            .withMessage("email is required")
            .isLength({ min: 3 })
            .withMessage("wrong email length")
            .bail(),
        (0, express_validator_1.check)("email")
            .exists()
            .withMessage("email is required")
            .isEmail()
            .withMessage("email not valid"),
    ]),
    (0, express_validator_1.check)("password").exists().withMessage("password is required"),
];
const login = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = request.body;
    const user = yield prisma.user.findFirst({
        where: {
            email,
        },
    });
    const isCorrectPassword = response.send("login");
});
exports.login = login;
const register = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    response.send("register");
});
exports.register = register;
