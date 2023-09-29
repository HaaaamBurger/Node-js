import { NextFunction, Request, Response } from "express";

import { User } from "../models/user.model";

class UserMiddleware {
  public async getByIdOrThrow(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const user = await User.findById(id);
      console.log(user);
      if (!user) {
        throw new Error("No such a user!(mw)");
      }

      res.locals = user;

      next();
    } catch (e) {
      res.status(409).json(e.message);
    }
  }
}

export const userMiddleware = new UserMiddleware();
