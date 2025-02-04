import { authService } from "./auth.service";
import { Request, Response } from "express";

export class AuthController {
  async login(req: Request, res: Response) {
    const token = await authService.login(req.body);

    res.json({ token }).status(200);
  }

  async logout(req: Request, res: Response) {
    const { userId } = req.body;
    await authService.logout(userId);

    res.json({ userId }).status(200);
  }

  async me(req: Request, res: Response) {
    const user = req.app.locals.user;

    const self = await authService.me(user);

    res.json(self);
  }
}

export const authController = new AuthController();
