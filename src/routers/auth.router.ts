import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { userMiddleware } from "../middlewares/user.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.post("/login", authController.loginUser);
router.post(
  "/register",
  userMiddleware.isBodyValid(UserValidator.register),
  userMiddleware.isExists,
  authController.registerUser,
);

export const authRouter = router;
