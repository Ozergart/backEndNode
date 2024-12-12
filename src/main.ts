import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";

import { ApiError } from "./errors/api-error";
import { userRouter } from "./routers/user.router";

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

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
app.listen(port, () => {
  console.log(`Server work on http://localhost:${port}`);
});
