import { Router } from "express";
import { userController } from "@modules/user/user.controller";

const userRoutes = Router();

userRoutes.get("/users", userController.getAllUsers);

userRoutes.post("/user", userController.createUser);
userRoutes.get("/user/:id", userController.getUser);
userRoutes.patch("/user/:id", userController.edit);

export { userRoutes };
