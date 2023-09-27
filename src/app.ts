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

app.get("/users/:id", async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findById(userId);
  res.status(200).json(user);
});

const PORT = "4444";
app.listen(PORT, async () => {
  console.log(`Server has started on ${PORT} port!`);
  await mongoose.connect(configs.DB_URI!);
});
