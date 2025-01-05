import { Request, Response } from "express";
import { userService } from "./user.service";
import { userModel } from "./user.model";

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

    const response = await userModel.findAll();
    res.json(response);
  }

  async getSelf(req: Request, res: Response) {
    const user = req.app.locals.user;

    const self = await userService.getSelf(user);

    res.json(self);
  }
}

export const userController = new UserController();
