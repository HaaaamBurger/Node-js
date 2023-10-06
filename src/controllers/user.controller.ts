import { NextFunction, Request, Response } from "express";

import { userService } from "../services/user.service";

class UserController {
  public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await userService.getAll();
      res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  }
  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await userService.userById(id);
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }
  public async deleteById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await userService.deleteById(id);
      res.status(200).json("User deleted!");
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
