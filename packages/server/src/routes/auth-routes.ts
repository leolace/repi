import { authController } from "../controllers/auth.controller.ts";
import { Router } from "express";

const authRoutes = Router();

authRoutes.get("/users", authController.getAllUsers);
authRoutes.post("/users", authController.createUser);

export { authRoutes };
