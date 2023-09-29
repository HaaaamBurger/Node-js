import { Request, Response } from "express";

import { IUser } from "../interfaces/user.interface";
import { userServices } from "../services/user.services";

class UserController {
  public async getAll(req: Request, res: Response): Promise<Response<IUser[]>> {
    const users = await userServices.getUsers();
    return res.status(200).json({
      data: users,
    });
  }
  public async getById(req: Request, res: Response): Promise<Response<IUser>> {
    try {
      const user = res.locals;
      return res.status(200).json(user);
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }
  public async post(req: Request, res: Response): Promise<Response<string>> {
    try {
      await userServices.postUser(req.body);
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
      await userServices.deleteById(req.params.id);
      return res.status(200).json("User deleted!");
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }
  public async put(req: Request, res: Response) {
    try {
      await userServices.updateUser(req.params.id, req.body);
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
