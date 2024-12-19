import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { configs } from "./configs/configs";
import { ApiError } from "./errors/api-error";
import { authRouter } from "./routers/auth.router";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use(
  "*",
  (
    error: ApiError | Error,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (error instanceof ApiError) {
      res.status(error.status).json({ message: error.message });
    } else if (error instanceof Error) {
      res.status(500).json({ message: "something was wrong" });
    }
  },
);
process.on("uncaughtException", (error) => {
  console.error("uncaughtException", error.message);
  process.exit(1);
});

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  await mongoose.connect(configs.mongoURL);
  console.log(`Server work on http://localhost:${port}`);
});
