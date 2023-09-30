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
}

export const userController = new UserController();
