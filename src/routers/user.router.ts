import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userMiddleware } from "../middlewares/user.middleware";

const router = Router();

router.get("/", userController.getAll);

router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userMiddleware.getByIdOrThrow,
  userController.getById,
);

router.post("/", userController.post);

router.delete("/:id", userController.deleteById);

router.put("/:id", userController.put);

export const userRouter = router;
