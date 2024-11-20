import { authService } from "./auth.service";
import { Request, Response } from "express";

export class AuthController {
  async createUser(req: Request, res: Response) {
    const response = await authService.createUser(req.body);

    res.json(response).status(201);
  }

  async login(req: Request, res: Response) {
    const token = await authService.login(req.body);

    res.json({ token }).status(200);
  }
}

export const authController = new AuthController();
