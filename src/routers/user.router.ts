import { Request, Response, Router } from "express";

import { userController } from "../controllers/user.controller";
import { User } from "../models/user.model";
import { IUser } from "../types/user.type";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.findAll);

router.get(
  "/:id",
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

router.post(
  "/",
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

router.delete(
  "/:id",
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

router.put("/:id", async (req, res): Promise<Response<string>> => {
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

export const userRouter = router;
