import { Router } from "express";

import { carsController } from "../controllers/cars.controller";
import { carMiddleware } from "../middlewares/car.middleware";
import { CarValidation } from "../validators/car.validation";
const router = Router();

router.get("", carsController.getAll);
router.get(
  "/:id",
  carMiddleware.isIdValid,
  carMiddleware.isCar,
  carsController.getById,
);
router.post(
  "",
  carMiddleware.isBodyValid(CarValidation.create),
  carsController.create,
);
router.delete("/:id", carMiddleware.isIdValid, carsController.delete);
router.put(
  "/:id",
  carMiddleware.isIdValid,
  carMiddleware.isBodyValid(CarValidation.update),
  carsController.put,
);
export const carRouter = router;
