import { Router } from "express";

import { userController } from "../controllers/user.controller";

const router = Router();

router.get("/", userController.getAll);

router.get("/:id", userController.getById);

router.post("/users", userController.post);

router.delete("/users/:id", userController.deleteById);

router.put("/users/:id", userController.put);

export const userRouter = router;
