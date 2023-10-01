import { Router } from "express";

import { carsController } from "../controllers/cars.controller";
import { carMiddleware } from "../middlewares/car.middleware";
import { CarValidation } from "../validators/car.validation";
const router = Router();

router.get("", carsController.getAll);
router.get("/:id", carMiddleware.isIdValid);
router.post(
  "",
  carMiddleware.isBodyValid(CarValidation.create),
  carsController.create,
);
router.delete("/:id");
export const carRouter = router;
