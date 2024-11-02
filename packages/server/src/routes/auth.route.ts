import { Router } from "express";
import { authController } from "../entities/auth/index.ts";

const authRoutes = Router();

authRoutes.post("/auth", authController.createUser);

export { authRoutes };
