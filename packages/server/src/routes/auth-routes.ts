import { tagController } from "../controllers/tag.controller.ts";
import { authController } from "../controllers/auth.controller.ts";
import { Router } from "express";
import { userController } from "../controllers/user.controller.ts";

const authRoutes = Router();

authRoutes.get("/users", authController.getAllUsers);
authRoutes.post("/users", authController.createUser);

authRoutes.get("/tags", tagController.findAllTags);
authRoutes.post("/tags", tagController.createTag);
authRoutes.delete("/tags", tagController.deleteTag);

authRoutes.post("/tags/user", userController.assignTagToUser);
authRoutes.get("/tags/:userId", userController.getUserTags);

export { authRoutes };
