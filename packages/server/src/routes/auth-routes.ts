import { tagController } from "../controllers/tag.controller.ts";
import { authController } from "../controllers/auth.controller.ts";
import { Router } from "express";

const authRoutes = Router();

authRoutes.get("/users", authController.getAllUsers);
authRoutes.post("/users", authController.createUser);

authRoutes.get("/tags", tagController.findAllTags);
authRoutes.post("/tags", tagController.createTag);
authRoutes.delete("/tags", tagController.deleteTag);

export { authRoutes };
