import { Request, Response } from "express";
import mongoose from "mongoose";

import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";
import { userServices } from "../services/user.services";
import { UserValidator } from "../validators/user.validator";

class UserController {
  public async getAll(req: Request, res: Response): Promise<Response<IUser[]>> {
    const users = await userServices.getUsers();
    return res.status(200).json({
      data: users,
    });
  }
  public async getById(req: Request, res: Response): Promise<Response<IUser>> {
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
  }
  public async post(req: Request, res: Response): Promise<Response<string>> {
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
  }
  public async deleteById(
    req: Request,
    res: Response,
  ): Promise<Response<string>> {
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
  }
  public async put(req: Request, res: Response) {
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
  }
}

export const userController = new UserController();
