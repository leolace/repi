import { Request, Response } from "express";
import { republicaService } from "./republica.service";

class RepublicaController {
  async findAll(req: Request, res: Response) {
    const republicas = await republicaService.findAll();

    res.json(republicas);
  }

  async findByUser(req: Request, res: Response) {
    const { userId } = req.params;

    const republica = await republicaService.findByUser(userId);

    res.json(republica);
  }

  async store(req: Request, res: Response) {
    const republica = await republicaService.store(req.body);

    res.json(republica).status(201);
  }

  async edit(req: Request, res: Response) {
    const { userId } = req.params;
    const republica = await republicaService.edit(userId, req.body);

    res.json(republica).status(201);
  }
}

export const republicaController = new RepublicaController();
