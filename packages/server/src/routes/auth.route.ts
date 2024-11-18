import { Router } from "express";
import { authController } from "@entities/auth/index";

const authRoutes = Router();

authRoutes.post("/auth", authController.createUser);
authRoutes.post("/auth/login", authController.login);

export { authRoutes };
