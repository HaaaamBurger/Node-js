import express, { Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";

const fsService = require("..//fs.services");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

interface IUser {
  name: string;
  age: number;
  gender: string;
}

const validChecker = (user: IUser) => {
  if (user.name.length > 3 && user.age >= 0) {
    return true;
  }
};

app.get("/", async (res: Response) => {
  const users = await fsService.reader();

  res.status(201).json({
    data: users,
  });
});

app.get("/:id", async (req: Request, res: Response) => {
  const users = await fsService.reader();
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

app.post("/", async (req: Request, res: Response) => {
  const user = req.body;
  const users = await fsService.reader();

  try {
    if (validChecker(user)) {
      users.push(user);
      await fsService.writer(users);
      res.status(201).json({
        body: user,
        message: "User created!",
      });
    } else {
      throw new Error("Wrong validation!");
    }
  } catch (e) {
    res.status(404).json({
      message: "Wrong validation!",
    });
  }
});

app.put("/:id", async (req: Request, res: Response) => {
  const users = await fsService.reader();
  const user = req.body;
  const userId = (() => {
    const { id } = req.params;
    return +id - 1;
  })();

  try {
    if (!users[userId]) {
      throw new Error("No such a user!");
    }

    if (!validChecker(user)) {
      throw new Error("Wrong validation!");
    }

    users[userId] = user;
    await fsService.writer(users);
    res.status(201).json({
      body: user,
      message: "User updated!",
    });
  } catch (e) {
    res.status(404).json({
      message: "Error",
    });
  }
});

app.delete("/:id", async (req: Request, res: Response) => {
  const users = await fsService.reader();
  const userId = (() => {
    const { id } = req.params;
    return +id - 1;
  })();

  try {
    if (!users[userId]) {
      throw new Error("No such a user!");
    }
    users.splice(userId, 1);
    await fsService.writer(users);
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
  await mongoose.connect(configs.DB_URI);
  console.log(`Server has started on ${PORT} port!`);
});
