import { IUser } from "common";
import {
  CreateUserDto,
  createUserSchema,
  searchParamsUserSchema,
} from "../dtos/auth.dto.ts";
import { authModel } from "../models/auth.model.ts";
import { ErrorE } from "../utils/error.ts";

class AuthService {
  async getAllUsers() {
    const res = await authModel.findAll();

    return res;
  }

  async findUserBy(values: Record<string, any>) {
    const { data } = searchParamsUserSchema.safeParse(values);
    if (!data) return [];

    const searchedValues: Partial<IUser> = data;
		const users = await authModel.findBy(searchedValues);

    return users[0];
  }

	async findUsersBy(values: Record<string, any>) {
		const { data } = searchParamsUserSchema.safeParse(values);
		if (!data) return [];

		const searchedValues: Partial<IUser> = data;

		return authModel.findBy(searchedValues);
	}

  async createUser(user: CreateUserDto) {
    const validatedUser = createUserSchema.parse(user);

    const userAlreadyExists = await this.findUserBy({ email: user.email });

    if (userAlreadyExists)
      throw new ErrorE(`E-mail ${user.email} is already in use.`, 400);
    const createdUser = await authModel.store(validatedUser);

    if ("password" in createdUser) {
      delete createdUser.password;
    }

    return createdUser;
  }
}

export const authService = new AuthService();
