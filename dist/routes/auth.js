"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const validationMiddleware_1 = require("../middleware/validationMiddleware");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/login", auth_1.authValidation, validationMiddleware_1.validationMiddleware, auth_1.login);
exports.userRouter.post("/register", auth_1.authValidation, auth_1.nameValidation, validationMiddleware_1.validationMiddleware, auth_1.register);
