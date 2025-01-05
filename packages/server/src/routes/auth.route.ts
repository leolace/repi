import { Router } from "express";
import { authController } from "@entities/auth/index";
import { authMiddleware } from "@middlewares/auth.middleware";

const authRoutes = Router();

authRoutes.post("/auth/login", authController.login);
authRoutes.delete("/auth/logout", authMiddleware, authController.logout);

export { authRoutes };
