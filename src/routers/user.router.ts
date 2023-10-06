import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
const router = Router();

router.get("/", userController.getAll);
router.get(
  "/:id",
  authMiddleware.checkAccessToken,
  userMiddleware.isIdValid,
  userController.getById,
);
router.delete("/:id", userMiddleware.isIdValid, userController.deleteById);

export const userRouter = router;
