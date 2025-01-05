import { Router } from "express";
import { tagController } from "../entities/tag/index";
import { authMiddleware } from "@middlewares/auth.middleware";

const tagRoutes = Router();

tagRoutes.use("/tags", authMiddleware);
tagRoutes.get("/tags", tagController.findAllTags);
tagRoutes.post("/tags", tagController.createTag);
tagRoutes.delete("/tags", tagController.deleteTag);

tagRoutes.post("/tags/user", tagController.assignTagToUser);
tagRoutes.get("/tags/:userId", tagController.getUserTags);

export { tagRoutes };
