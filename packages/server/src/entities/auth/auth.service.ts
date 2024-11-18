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
    console.log(validatedLogin, await userModel.getPassword(userExists.id), userExists, passwordMatch);
    
    if (!passwordMatch) throw new ErrorE("Credenciais inválidas", 400);

    const { token } = await authModel.login(userExists.id);

    return token;
  }
}

export const authService = new AuthService();
