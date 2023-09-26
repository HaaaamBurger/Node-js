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

app.get(
  "/users/:id",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    const users = await User.find();
    const userId = (() => {
      const { id } = req.params;
      return +id - 1;
    })();

    try {
      if (!users[userId]) {
        throw new Error("No such a user!");
      }
      return res.status(201).json(users[userId]);
    } catch (e) {
      return res.status(404).json("No such a user!");
    }
  },
);

app.post(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    try {
      const createdUser = await User.create({ ...req.body });
      return res.status(201).json({
        body: createdUser,
        message: "User created!",
      });
    } catch (e) {
      return res.status(404).json(e.message);
    }
  },
);

app.put("/users/:id", async (req: Request, res: Response) => {
  // const userId = (() => {
  //   const { id } = req.params;
  //   return +id - 1;
  // })();
  const userId = req.params;
  const findUser = await User.findById(userId);
  console.log(findUser);

  // try {
  //   if (!users[userId]) {
  //     throw new Error("No such a user!");
  //   }
  //   await User.updateOne({ ...req.body });
  //   return res.status(201).json({
  //     body: { ...req.body },
  //     message: "User updated!",
  //   });
  // } catch (e) {
  //   return res.status(404).json({
  //     message: "Error",
  //   });
  // }
});

app.delete(
  "/users/:id",
  async (
    req: Request,
    res: Response,
  ): Promise<Response<{ message: string }>> => {
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
      return res.status(201).json({
        message: "User deleted!",
      });
    } catch (e) {
      return res.status(404).json({
        message: "No such a user!",
      });
    }
  },
);

const PORT = 4446;
app.listen(PORT, async () => {
  await mongoose.connect(
    "mongodb+srv://leaguecy:kunleM2004@nodedatabase.i5pp26l.mongodb.net/test",
  );
  console.log(`Server has started on ${PORT} port!`);
});
