import express from "express";
import * as mongoose from "mongoose";

import { userRouter } from "./user.router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

const PORT = 4444;
app.listen(PORT, () => {
  mongoose.connect("mongodb://127.0.0.1:27017/hw_2");
  console.log(`Server has started on ${PORT} port!`);
});
