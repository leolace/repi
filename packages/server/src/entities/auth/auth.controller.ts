import { env } from "common/src/environment.server";
import { authService } from "./auth.service";
import { Request, Response } from "express";

export class AuthController {
  async login(req: Request, res: Response) {
    const token = await authService.login(req.body);

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 dia
    res
      .cookie("session", token, {
        httpOnly: true,
        secure: env.ENV === "prod",
        expires: expiresAt,
        sameSite: "lax",
        path: "/",
      })
      .json({ token })
      .status(200);
  }

  async logout(req: Request, res: Response) {
    const { userId } = req.body;
    await authService.logout(userId);

    res.json({ userId }).status(200);
  }
}

export const authController = new AuthController();
