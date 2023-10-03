import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/configs";
import { ApiError } from "./errors/apiError";
import { authRouter } from "./routers/auth.router";
import { userRouter } from "./routers/user.router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  res.status(status).json(err.message);
});

app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URI!);
  console.log(`Server has started on ${configs.PORT} port!`);
});
