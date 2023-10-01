import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import * as mongoose from "mongoose";

import { ApiError } from "../errors/api.error";
import {carService} from "../services/car.service";

class CarMiddleware {
  public isIdValid(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      if (!mongoose.isObjectIdOrHexString(id)) {
        throw new ApiError("Invalid Id!", 409);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
  public isBodyValid(validator: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const { value, error } = validator.validate(req.body);
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
  public async isCar(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await carService.deleteCar(id);
    } catch (e) {
      next(e);
    }
  }
}

export const carMiddleware = new CarMiddleware();
