import { NextFunction, Request, Response } from "express";
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
}
export const commonMiddleware = new CommonMiddleware();
