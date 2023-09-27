import express, { Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { User } from "./models/user.model";
import { IUser } from "./types/user.type";

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

app.get("/users/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    return res.status(200).json(user);
  }
  return res.status(400).json("No such a user!");
});

app.post("/users", async (req: Request, res: Response) => {
  try {
    const createdUser = await User.create({ ...req.body });
    return res.status(200).json(createdUser);
  } catch (e) {
    return res.status(400);
  }
});

app.delete("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await User.deleteOne({ _id: id });
    res.status(200).json("User deleted!");
  } catch (e) {
    res.status(400).json(e.message);
  }
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndUpdate(id, req.body);
    res.status(200).json("User updated!");
  } catch (e) {
    res.status(400).json(e.message);
  }
});

const PORT = "4444";
app.listen(PORT, async () => {
  console.log(`Server has started on ${PORT} port!`);
  await mongoose.connect(configs.DB_URI!);
});
