import express, { Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { User } from "./models/user.model";
import { IUser } from "./types/user.type";
import { UserValidator } from "./validators/user.validator";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser[]>> => {
    const users = await User.find();
    return res.status(200).json({
      data: users,
    });
  },
);

app.get(
  "/users/:id",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    const userId = req.params.id;
    const user = await User.findById(userId);

    try {
      if (!user) {
        throw new Error("No such a user!");
      }
      return res.status(200).json(user);
    } catch (e) {
      return res.status(400).json(e.message);
    }
  },
);

app.post(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    try {
      const { value, error } = UserValidator.create.validate(req.body);
      if (error) {
        throw new Error(error.message);
      }
      const createdUser = await User.create(value);
      return res.status(200).json(createdUser);
    } catch (e) {
      return res.status(400).json(e.message);
    }
  },
);

app.delete(
  "/users/:id",
  async (req: Request, res: Response): Promise<Response<string>> => {
    const { id } = req.params;
    try {
      await User.deleteOne({ _id: id });
      return res.status(200).json("User deleted!");
    } catch (e) {
      return res.status(400).json(e.message);
    }
  },
);

app.put("/users/:id", async (req, res): Promise<Response<string>> => {
  const { id } = req.params;

  try {
    const { error, value } = UserValidator.update.validate(req.body);

    if (error) {
      throw new Error(error.message);
    }
    const user = await User.findByIdAndUpdate(id, value, {
      returnDocument: "after",
    });

    if (!user) {
      throw new Error("User not found!");
    }
    return res.status(200).json("User updated!");
  } catch (e) {
    return res.status(400).json(e.message);
  }
});

const PORT = "4444";
app.listen(PORT, async () => {
  console.log(`Server has started on ${PORT} port!`);
  await mongoose.connect(configs.DB_URI!);
});
