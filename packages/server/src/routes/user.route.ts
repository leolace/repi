import { Router } from "express";
import { userController } from "../entities/user/user.controller";

const userRoutes = Router();

userRoutes.get("/users", userController.getAllUsers);

export { userRoutes };
