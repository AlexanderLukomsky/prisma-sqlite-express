"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
exports.userRouter = (0, express_1.Router)({});
exports.userRouter.post("/login", (req, res) => {
    res.send("login");
});
exports.userRouter.post("/register", (req, res) => {
    res.send("register");
});
