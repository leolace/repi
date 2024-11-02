import { Router } from "express";
import { tagController } from "../entities/tag/index.ts";

const tagRoutes = Router();

tagRoutes.get("/tags", tagController.findAllTags);
tagRoutes.post("/tags", tagController.createTag);
tagRoutes.delete("/tags", tagController.deleteTag);

tagRoutes.post("/tags/user", tagController.assignTagToUser);
tagRoutes.get("/tags/:userId", tagController.getUserTags);

export { tagRoutes };
