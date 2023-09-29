import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import mongoose from "mongoose";

class CommonMiddleware {
  public isIdValid(field: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params[field];
        if (!mongoose.isObjectIdOrHexString(id)) {
          throw new Error("Invalid id!(mw)");
        }
        next();
      } catch (e) {
        res.status(400).json(e.message);
      }
    };
  }
  public isBodyValid(validator: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const { error, value } = validator.validate(req.body);
        if (error) {
          throw new Error(error.message);
        }
        req.body = value;
        next();
      } catch (e) {
        res.status(400).json(e.message);
      }
    };
  }
}
export const commonMiddleware = new CommonMiddleware();
