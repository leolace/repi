import { IUser } from "common";
import {
  CreateUserDto,
  createUserSchema,
  searchParamsUserSchema,
} from "../dtos/auth.dto.ts";
import { authModel } from "../models/auth.model.ts";
import { z } from "zod";

class AuthService {
  async getAllUsers() {
    const res = await authModel.findAll();

    return res;
  }

  async findUserBy(values: Record<string, any>) {
    const { data } = searchParamsUserSchema.safeParse(values);
    if (!data) return [];

    const searchedValues: Partial<IUser> = data;
		
		return authModel.findBy(searchedValues);
  }

  async createUser(user: CreateUserDto) {
    try {
      const validatedUser = createUserSchema.parse(user);

      const createdUser = await authModel.store(validatedUser);

      if ("password" in createdUser) {
        delete createdUser.password;
      }

      return createdUser;
    } catch (e) {
      if (e instanceof z.ZodError) {
        return { error: e.errors };
      }
      return { error: e };
    }
  }
}

export const authService = new AuthService();
