import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { ApiError } from "./errors/api.error";
import { IUser } from "./interfaces/user.interface";
import { User } from "./models/user.model";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", async (req, res): Promise<Response<IUser[]>> => {
  const users = await User.find();
  return res.status(200).json({
    data: users,
  });
});

app.get("/users/:id", async (req, res): Promise<Response<IUser>> => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("No such a user!");
    }
    return res.status(200).json(user);
  } catch (e) {
    return res.status(400).json(e.message);
  }
});



app.post("/users", async (req, res): Promise<Response<string>> => {
  try {
    await User.create(req.body);
    return res.status(200).json("User created!");
  } catch (e) {
    return res.status(400).json(e.message);
  }
});

app.delete("/users/:id", async (req, res): Promise<Response<string>> => {
  const { id } = req.params;
  try {
    const findUser = User.findById(id);
    if (!findUser) {
      throw new Error("No such a user!");
    }
    await User.deleteOne({ _id: id });
    return res.status(200).json("User deleted!");
  } catch (e) {
    return res.status(400).json(e.message);
  }
});

app.put("/users/:id", async (req, res, next: NextFunction) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
    });
    if (!user) {
      throw new ApiError("No such a user!", 404);
    }
    return res.status(200).json({
      body: req.body,
      message: "User updated!",
    });
  } catch (e) {
    next(e);
  }
});

app.use((err: any, req: Request, res: Response) => {
  const status = err.status || 500;
  res.status(status).json(err.message);
});

const PORT = "4444";
app.listen(PORT, async () => {
  await mongoose.connect(configs.DB_URI!);
  console.log(`Server has started on ${PORT} port!`);
});
