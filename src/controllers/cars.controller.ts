import { NextFunction, Request, Response } from "express";

import { carService } from "../services/car.service";

class CarsController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const cars = await carService.getAll();
      res.status(200).json(cars);
    } catch (e) {
      next(e);
    }
  }
  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const car = res.locals;
      res.status(200).json(car);
    } catch (e) {
      next(e);
    }
  }
  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await carService.createCar(req.body);
      res.status(200).json({
        body: req.body,
        message: "Car created!",
      });
    } catch (e) {
      next(e);
    }
  }
  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await carService.deleteCar(id);
      res.status(200).json("Car deleted!");
    } catch (e) {
      next(e);
    }
  }
  public async put(req: Request, res: Response, next: NextFunction) {
    try {
      await carService.putCar(req.params.id, req.body);
      res.status(200).json("Car updated!");
    } catch (e) {
      next(e);
    }
  }
}
export const carsController = new CarsController();
