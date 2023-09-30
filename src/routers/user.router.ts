import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { usersMiddleware } from "../middlewares/users.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getAll);

router.get(
  "/:id",
  usersMiddleware.isIdValid,
  usersMiddleware.isUser,
  userController.getById,
);

router.post(
  "/",
  usersMiddleware.isValidBody(UserValidator.create),
  userController.create,
);

router.delete(
  "/:id",
  usersMiddleware.isUser,
  usersMiddleware.isIdValid,
  userController.delete,
);

router.put(
  "/:id",
  usersMiddleware.isIdValid,
  usersMiddleware.isValidBody(UserValidator.update),
  userController.update,
);

export const userRouter = router;
