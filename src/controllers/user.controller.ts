import { Request, Response } from "express";

import { IUser } from "../types/user.type";
import { User } from "../models/user.model";

class UserController {
  public async findAll(req: Request, res: Response): Promise<Response<IUser[]>> {
    const users = await User.find();
    return res.status(200).json({
      data: users,
    });
  }
}

export const userController = new UserController();
