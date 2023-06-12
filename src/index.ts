import express from "express";
import jwt from "jsonwebtoken";
import { userRouter } from "./routes/auth";
require("dotenv").config();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/auth", userRouter);

app.listen(port, () => {
  console.log("Ok");
});
