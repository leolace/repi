import { Request, Response } from "express";
import { userService } from "./user.service";
import { userModel } from "./user.model";

class UserController {
  async getAllUsers(req: Request, res: Response) {
    if (Object.keys(req.query).length) {
      const response = await userService.findUsersBy(req.query);

      res.json(response);
      return;
    }

    const response = await userModel.findAll();
    res.json(response);
  }
}

export const userController = new UserController();
