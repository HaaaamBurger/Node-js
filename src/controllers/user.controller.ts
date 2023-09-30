import { NextFunction, Request, Response } from "express";

import { userRepository } from "../respositories/user.repository";

class UserController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const users = await userRepository.getAll();
      res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  }
  public async getById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = res.locals;
      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      await userRepository.create(req.body);
      res.status(200).json({
        body: req.body,
        message: "User created!",
      });
    } catch (e) {
      next(e);
    }
  }
  public async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      await userRepository.delete(id);
      res.status(200).json("User deleted!");
    } catch (e) {
      next(e);
    }
  }
  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = req.body;
      await userRepository.update(id, user);
      res.status(200).json({
        body: user,
        message: "User updated!",
      });
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
