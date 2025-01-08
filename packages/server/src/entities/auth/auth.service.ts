import { LoginUserDto, loginUserSchema } from "./auth.dto";
import { authModel } from "./auth.model";
import { ErrorE } from "../../utils/error";
import { userService } from "../user/user.service";
import bcrypt from "bcrypt";
import { userModel } from "@entities/user";
import { genSessionToken } from "@utils/generate-token";

class AuthService {
  async login(user: LoginUserDto): Promise<string> {
    const validatedLogin = loginUserSchema.parse(user);

    const userExists = await userService.findUserBy({
      email: validatedLogin.email
    });

    if (!userExists) throw new ErrorE("Credenciais inválidas", 400);

    const passwordMatch = await bcrypt.compare(
      validatedLogin.password,
      await userModel.getPassword(userExists.id)
    );
    if (!passwordMatch) throw new ErrorE("Credenciais inválidas", 400);

    const sessionTokenPayload = {
      userId: userExists.id,
      class: userExists.class
    };
    const generatedToken = await genSessionToken(sessionTokenPayload);

    const userSession = await authModel.getUserSession(userExists.id);
    if (userSession) await authModel.deleteSession(userSession.id);

    const { token } = await authModel.login(userExists.id, generatedToken);

    return token;
  }

  async logout(userId: string) {
    const userExists = await userService.findUserBy({
      id: userId
    });
    if (!userExists) throw new ErrorE("Usuário não encontrado", 400);

    const userSession = await authModel.getUserSession(userId);
    if (userSession) await authModel.deleteSession(userSession.id);

    return;
  }
}

export const authService = new AuthService();
