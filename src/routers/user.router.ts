import { Router } from "express";

import { userController } from "../controllers/user.controller";

const router = Router();

router.get("/", userController.getAll);

router.get("/:id", userController.getById);

router.post("/", userController.post);

router.delete("/:id", userController.deleteById);

router.put("/:id", userController.put);

export const userRouter = router;
