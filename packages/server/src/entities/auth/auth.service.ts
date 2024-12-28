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
import { genSessionToken } from "@utils/generate-token";

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

    const sessionTokenPayload = {
      userId: userExists.id,
      class: userExists.class,
    };
    const generatedToken = await genSessionToken(sessionTokenPayload, "7d");

    const userSession = await authModel.getUserSession(userExists.id);
    if (userSession) await authModel.deleteSession(userSession.id);

    const { token } = await authModel.login(userExists.id, generatedToken);

    return token;
  }

  async logout(userId: string) {
    const userExists = await userService.findUserBy({
      id: userId,
    });
    if (!userExists) throw new ErrorE("Usuário não encontrado", 400);

    const userSession = await authModel.getUserSession(userId);
    if (userSession) await authModel.deleteSession(userSession.id);

    return;
  }
}

export const authService = new AuthService();
