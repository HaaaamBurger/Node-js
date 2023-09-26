import express, { Request, Response } from "express";
import * as mongoose from "mongoose";

import { User } from "./models/User.model";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

interface IUser {
  name: string;
  age: number;
  gender: string;
}

app.get(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser[]>> => {
    const users = await User.find();
    return res.json(users);
  },
);

app.get("/users/:id", async (req: Request, res: Response) => {
  const users = await User.find();
  const userId = (() => {
    const { id } = req.params;
    return +id - 1;
  })();

  try {
    if (!users[userId]) {
      throw new Error("No such a user!");
    }
    res.status(201).json(users[userId]);
  } catch (e) {
    res.status(404).json("No such a user!");
  }
});

app.post("/users", async (req: Request, res: Response) => {
  try {
    const createdUser = await User.create({ ...req.body });
    res.status(201).json({
      body: createdUser,
      message: "User created!",
    });
  } catch (e) {
    res.status(404).json(e.message);
  }
});

app.put("/users/:id", async (req: Request, res: Response) => {
  const users = await User.find();
  const userId = (() => {
    const { id } = req.params;
    return +id - 1;
  })();

  try {
    if (!users[userId]) {
      throw new Error("No such a user!");
    }
    await User.updateOne({ ...req.body });
    res.status(201).json({
      body: { ...req.body },
      message: "User updated!",
    });
  } catch (e) {
    res.status(404).json({
      message: "Error",
    });
  }
});

app.delete("/users/:id", async (req: Request, res: Response) => {
  const users = await User.find();
  const userId = (() => {
    const { id } = req.params;
    return +id - 1;
  })();

  try {
    if (!users[userId]) {
      throw new Error("No such a user!");
    }
    const deleteUser = users[userId];
    await User.deleteOne({ email: deleteUser.email });
    res.status(201).json({
      message: "User deleted!",
    });
  } catch (e) {
    res.status(404).json({
      message: "No such a user!",
    });
  }
});

const PORT = 4444;
app.listen(PORT, async () => {
  await mongoose.connect(
    "mongodb+srv://leaguecy:kunleM2004@nodedatabase.i5pp26l.mongodb.net/test",
  );
  console.log(`Server has started on ${PORT} port!`);
});
