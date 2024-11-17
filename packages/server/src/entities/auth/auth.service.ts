import { CreateUserDto, createUserSchema } from "./auth.dto";
import { authModel } from "./auth.model";
import { ErrorE } from "../../utils/error";
import { userService } from "../user/user.service";
import { tagService } from "../tag/tag.service";

class AuthService {
  async createUser(user: CreateUserDto) {
    const validatedUser = createUserSchema.parse(user);

    const userAlreadyExists = await userService.findUserBy({
      email: user.email,
    });

    if (userAlreadyExists)
      throw new ErrorE(`E-mail ${user.email} is already in use.`, 400);
    const createdUser = await authModel.store(validatedUser);

    if (user.tags) await tagService.assignTagToUser(user.tags, createdUser.id);

    if ("password" in createdUser) {
      delete createdUser.password;
    }

    return createdUser;
  }
}

export const authService = new AuthService();
