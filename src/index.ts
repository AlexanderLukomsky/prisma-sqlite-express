import express from "express";
import { authRouter } from "./routes/auth";
import { postsRouter } from "./routes/posts";
require("dotenv").config();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/auth", authRouter);
app.use("/posts", postsRouter);

app.listen(port, () => {
  console.log("server is running");
});
