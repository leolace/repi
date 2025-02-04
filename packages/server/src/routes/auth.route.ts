import { Router } from "express";
import { authMiddleware } from "@middlewares/auth.middleware";
import { authController } from "@modules/auth/auth.controller";

const authRoutes = Router();

authRoutes.post("/auth/login", authController.login);
authRoutes.delete("/auth/logout", authMiddleware, authController.logout);
authRoutes.get("/auth/me", authMiddleware, authController.me);

export { authRoutes };
