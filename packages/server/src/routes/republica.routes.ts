import { republicaController } from "@modules/republica/republica.controller";
import { authMiddleware } from "@middlewares/auth.middleware";
import { Router } from "express";

const republicaRoutes = Router();

republicaRoutes.get("/republica", republicaController.findAll);
republicaRoutes.get("/republica/:userId", republicaController.findByUser);
republicaRoutes.patch("/republica/:userId", authMiddleware, republicaController.edit);

export { republicaRoutes };
