import { userModel } from "./user.model";
import { searchParamsUserSchema } from "../auth/auth.dto";
import { IUser } from "common";

class UserService {
  async getAllUsers() {
    const res = await userModel.findAll();

    return res;
  }

  async findUserBy(values: Partial<IUser>) {
    const { data } = searchParamsUserSchema.safeParse(values);
    if (!data) return;

    const searchedValues: Partial<IUser> = data;
    const users = await userModel.findBy(searchedValues);

    return users[0];
  }

  async findUsersBy(values: Record<string, any>) {
    const { data } = searchParamsUserSchema.safeParse(values);
    if (!data) return [];

    const searchedValues: Partial<IUser> = data;

    return userModel.findBy(searchedValues);
  }
}

export const userService = new UserService();
