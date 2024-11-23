import {
  CreateUserDto,
  createUserSchema,
  LoginUserDto,
  loginUserSchema,
} from "./auth.dto";
import { authModel } from "./auth.model";
import { ErrorE } from "../../utils/error";
import { userService } from "../user/user.service";
import { tagService } from "../tag/tag.service";
import bcrypt from "bcrypt";
import { userModel } from "@entities/user";
import jwt from "jsonwebtoken";
import { IUserJWTPayload, env } from "common";

class AuthService {
  async createUser(user: CreateUserDto) {
    const validatedUser = createUserSchema.parse(user);

    const userAlreadyExists = await userService.findUserBy({
      email: user.email,
    });
    if (userAlreadyExists)
      throw new ErrorE(`E-mail ${user.email} is already in use.`, 400);

    validatedUser.password = await bcrypt.hash(validatedUser.password, 10);
    const createdUser = await authModel.store(validatedUser);

    if (user.tags) await tagService.assignTagToUser(user.tags, createdUser.id);

    if ("password" in createdUser) {
      delete createdUser.password;
    }

    return createdUser;
  }

  async login(user: LoginUserDto): Promise<string> {
    const validatedLogin = loginUserSchema.parse(user);

    const userExists = await userService.findUserBy({
      email: validatedLogin.email,
    });

    if (!userExists) throw new ErrorE("Credenciais inválidas", 400);

    const passwordMatch = await bcrypt.compare(
      validatedLogin.password,
      await userModel.getPassword(userExists.id)
    );
    if (!passwordMatch) throw new ErrorE("Credenciais inválidas", 400);

    const generatedToken = jwt.sign(
      { userId: userExists.id, class: userExists.class } as IUserJWTPayload,
      env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const { token } = await authModel.login(userExists.id, generatedToken);

    return token;
  }
}

export const authService = new AuthService();
