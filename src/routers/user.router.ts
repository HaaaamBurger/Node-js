import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getAll);

router.get(
  "/:id",
  commonMiddleware.isIdValid("id"),
  userMiddleware.getByIdOrThrow,
  userController.getById,
);

router.post(
  "/",
  commonMiddleware.isBodyValid(UserValidator.create),
  userController.post,
);

router.delete(
  "/:id",
  commonMiddleware.isIdValid("id"),
  userMiddleware.getByIdOrThrow,
  userController.deleteById,
);

router.put(
  "/:id",
  commonMiddleware.isBodyValid(UserValidator.update),
  commonMiddleware.isIdValid("id"),
  userController.put,
);

export const userRouter = router;
