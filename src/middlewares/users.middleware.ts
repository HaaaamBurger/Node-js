import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import * as mongoose from "mongoose";

import { ApiError } from "../errors/api.error";
import { userRepository } from "../respositories/user.repository";

class UsersMiddleware {
  public isIdValid(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!mongoose.isObjectIdOrHexString(id)) {
        throw new ApiError("Invalid id", 409);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
  public async isUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { id } = req.params;
    try {
      const user = await userRepository.getById(id);
      if (!user) {
        throw new ApiError("No such a user!", 404);
      }
      res.locals = user;
      next();
    } catch (e) {
      next(e);
    }
  }
  public isValidBody(validator: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const user = req.body;
        const { value, error } = validator.validate(user);
        if (error) {
          throw new ApiError(error.message, 404);
        }
        req.body = value;
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}
export const usersMiddleware = new UsersMiddleware();
