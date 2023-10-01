import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { ApiError } from "./errors/api.error";
import { carRouter } from "./routers/car.router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/cars", carRouter);

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  res.status(status).json(err.message);
});

const PORT = "4444";
app.listen(PORT, async () => {
  await mongoose.connect(configs.DB_URI!);
  console.log(`Server has started on ${PORT} port!`);
});
