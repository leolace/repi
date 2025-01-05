import { republicaController } from "@entities/republica/republica.controller";
import { Router } from "express";

const republicaRoutes = Router();

republicaRoutes.get("/republica", republicaController.findAll);
republicaRoutes.get("/republica/:userId", republicaController.findByUser);
republicaRoutes.patch("/republica/:userId", republicaController.edit);

export { republicaRoutes };
