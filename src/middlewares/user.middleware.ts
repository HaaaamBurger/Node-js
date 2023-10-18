import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import * as mongoose from "mongoose";

import { ApiError } from "../errors/apiError";
import { User } from "../models/user.model";

class UserMiddleware {
  public isBodyValid(validator: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const { error, value } = validator.validate(req.body);
        if (error) {
          throw new ApiError(error.message, 400);
        }
        req.body = value;
        next();
      } catch (e) {
        next(e);
      }
    };
  }
  public async isExists(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const findUser = await User.findOne({ email });
      if (findUser) {
        throw new ApiError("Such an email already exists!", 401);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
  public isIdValid(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!mongoose.isObjectIdOrHexString(id)) {
        throw new ApiError("Not valid ID", 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}
export const userMiddleware = new UserMiddleware();
