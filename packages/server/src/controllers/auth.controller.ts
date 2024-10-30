import { authService } from "../services/auth.service.ts";
import { authModel } from "../models/auth.model.ts";
import { Request, Response } from "express";

export class AuthController {
  async getAllUsers(req: Request, res: Response) {
    if (Object.keys(req.query).length) {
      const response = await authService.findUsersBy(req.query);
			
			res.json(response);
			return;
    }

    const response = await authModel.findAll();
    res.json(response);
  }

  async createUser(req: Request, res: Response) {
    const response = await authService.createUser(req.body);

    res.json(response).status(201);
  }
}

export const authController = new AuthController();
