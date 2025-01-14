import { Router } from "express";
import { userController } from "../entities/user/user.controller";
import { authMiddleware } from "@middlewares/auth.middleware";

const userRoutes = Router();

userRoutes.get("/users", userController.getAllUsers);

userRoutes.post("/user", userController.createUser);
userRoutes.get("/user/me", authMiddleware, userController.getSelf);
userRoutes.get("/user/:id", userController.getUser);
userRoutes.patch("/user/:id", userController.edit);

export { userRoutes };
