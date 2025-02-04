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

  async edit(req: Request, res: Response) {
    const { id } = req.params;

    const editedUser = await userService.update(id, req.body);

    res.json(editedUser);
  }
}

export const userController = new UserController();
