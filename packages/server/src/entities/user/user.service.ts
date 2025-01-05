import { userModel } from "./user.model";
import { searchParamsUserSchema } from "../auth/auth.dto";
import { IUser, IUserJWTPayload, UserClassesEnum } from "common";
import { CreateUserDto, createUserSchema } from "./user.dto";
import { ErrorE } from "@utils/error";
import { tagService } from "@entities/tag";
import bcrypt from "bcrypt";
import { republicaService } from "@entities/republica/republica.service";
import { unRawRepublicaData } from "@entities/republica/republica.utils";

class UserService {
  async createUser(user: CreateUserDto) {
    const validatedUser = createUserSchema.parse(user);

    const userAlreadyExists = await userService.findUserBy({
      email: user.email,
    });
    if (userAlreadyExists)
      throw new ErrorE(`E-mail ${user.email} is already in use.`, 400);

    validatedUser.password = await bcrypt.hash(validatedUser.password, 10);
    const createdUser = await userModel.store(validatedUser);

    if (user.tags) await tagService.assignTagToUser(user.tags, createdUser.id);

    if ("password" in createdUser) {
      delete createdUser.password;
    }

    if (user.class === UserClassesEnum.REPUBLICA)
      await republicaService.store({
        userId: createdUser.id,
        class: user.class,
      });

    return createdUser;
  }

  async getAllUsers() {
    const res = await userModel.findAll();

    return res;
  }

  async getSelf(user?: IUserJWTPayload) {
    if (!user) throw new ErrorE("User is not authenticated");

    const self = await userModel.getSelf(user);

    return self;
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
