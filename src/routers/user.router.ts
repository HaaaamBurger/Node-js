import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { userMiddleware } from "../middlewares/user.middleware";
const router = Router();

router.get("/", userController.getAll);
router.delete("/:id", userMiddleware.isIdValid, userController.deleteById);

export const userRouter = router;
