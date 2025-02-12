import { Request, Response } from "express";
import { userService } from "./user.service";

class UserController {
  async createUser(req: Request, res: Response) {
    const response = await userService.createUser(req.body);

    res.json(response).status(201);
  }

  async getAllUsers(req: Request, res: Response) {
    if (Object.keys(req.query).length) {
      const response = await userService.findUsersBy(req.query);

      res.json(response);
      return;
    }

    const response = await userService.getAllUsers();
    res.json(response);
  }

  async getUser(req: Request, res: Response) {
    const { id } = req.params;
    const completeUser = await userService.findCompleteUser({ id });

    res.json(completeUser);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    await userService.update(id, req.body);

    res.status(200).json(null);
  }

  async updateAvatar(req: Request, res: Response) {
    const user = req.app.locals.user;
    const pathname = await userService.updateAvatar(req.file, user?.userId);

    res.json({ pathname });
  }
}

export const userController = new UserController();
