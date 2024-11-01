import { Request, Response } from "express";
import { ErrorE } from "../utils/error.ts";
import { userService } from "../services/user.service.ts";

class UserController {
  async assignTagToUser(req: Request, res: Response) {
    const { userId, tagId } = req.body;

    if (!userId || !tagId) throw new ErrorE("Invalid request");

    await userService.assignTagToUser(userId, tagId);

    res.status(201).json();
  }

  async getUserTags(req: Request, res: Response) {
    const { userId } = req.params;

    if (!userId) throw new ErrorE("Invalid request");

		const userTags = await userService.getUserTags(userId);

		res.json(userTags);
  }
}

export const userController = new UserController();
