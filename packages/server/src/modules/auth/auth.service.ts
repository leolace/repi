import { authRepository } from "../../shared/repositories/auth.repository";
import { AppError } from "@shared/utils/error";
import { userService } from "../user/user.service";
import bcrypt from "bcrypt";
import { genSessionToken } from "@shared/utils/generate-token";
import { userRepository } from "@shared/repositories/user.repository";
import { LoginUserDto, loginUserSchema } from "./schemas/login";
import { IUserJWTPayload } from "common";

class AuthService {
  async login(user: LoginUserDto): Promise<string> {
    const validatedLogin = loginUserSchema.parse(user);

    const userExists = await userService.findUserBy({
      email: validatedLogin.email,
    });

    if (!userExists) throw AppError.BadRequestException("Invalid credentials.");

    const passwordMatch = await bcrypt.compare(
      validatedLogin.password,
      await userRepository.getPassword(userExists.id),
    );
    if (!passwordMatch)
      throw AppError.BadRequestException("Invalid credentials.");

    const sessionTokenPayload = {
      userId: userExists.id,
      class: userExists.class,
    };
    const generatedToken = await genSessionToken(sessionTokenPayload);

    const userSession = await authRepository.getUserSession(userExists.id);
    if (userSession) await authRepository.deleteSession(userSession.id);

    const { token } = await authRepository.login(userExists.id, generatedToken);

    return token;
  }

  async logout(userId: string) {
    const userExists = await userService.findUserBy({
      id: userId,
    });
    if (!userExists) throw AppError.NotFoundException("User not found.");

    const userSession = await authRepository.getUserSession(userId);
    if (userSession) await authRepository.deleteSession(userSession.id);

    return;
  }

  async me(user?: IUserJWTPayload) {
    if (!user)
      throw AppError.UnauthorizedException("User is not authenticated.");

    const self = await userRepository.getComplete(user);

    return self;
  }
}

export const authService = new AuthService();
