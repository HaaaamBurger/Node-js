import express, { Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { IUser } from "./interfaces/user.interface";
import { User } from "./models/user.model";
import { UserValidator } from "./validators/user.validator";

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
    const { value, error } = UserValidator.create.validate(req.body);
    if (error) {
      throw new Error(error.message);
    }
    await User.create(value);
    return res.status(200).json("User created!");
  } catch (e) {
    return res.status(400).json(e.message);
  }
});

app.delete("/users/:id", async (req, res): Promise<Response<string>> => {
  try {
    const { id } = req.params;
    if (!mongoose.isObjectIdOrHexString(id)) {
      throw new Error("Not valid ID");
    }
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

app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isObjectIdOrHexString(id)) {
      throw new Error("Not valid ID");
    }
    const { error, value } = UserValidator.update.validate(req.body);
    if (error) {
      throw new Error(error.message);
    }
    const user = await User.findByIdAndUpdate(id, value, {
      returnDocument: "after",
    });
    if (!user) {
      throw new Error("No such a user!");
    }
    return res.status(200).json({
      body: req.body,
      message: "User updated!",
    });
  } catch (e) {
    res.status(400).json(e.message);
  }
});

const PORT = "4444";
app.listen(PORT, async () => {
  await mongoose.connect(configs.DB_URI!);
  console.log(`Server has started on ${PORT} port!`);
});
