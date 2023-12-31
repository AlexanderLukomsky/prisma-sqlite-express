"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("./routes/auth");
const posts_1 = require("./routes/posts");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello world");
});
app.use("/auth", auth_1.authRouter);
app.use("/posts", posts_1.postsRouter);
app.listen(port, () => {
    console.log("server is running");
});
