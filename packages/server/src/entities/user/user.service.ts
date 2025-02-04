import { userModel } from "./user.model";
import { searchParamsUserSchema } from "../auth/auth.dto";
import {
  Bixo,
  CompleteUser,
  IUser,
  IUserJWTPayload,
  Republica,
  UserClassesEnum,
} from "common";
import {
  CreateUserDto,
  createUserSchema,
  EditUserDto,
  editUserSchema,
} from "./user.dto";
import { ErrorE } from "@utils/error";
import { tagService } from "@entities/tag";
import bcrypt from "bcrypt";
import { republicaService } from "@entities/republica/republica.service";
import { S3 } from "@shared/s3";

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

    if ("password" in createdUser) delete createdUser.password;

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
    const { data, error } = searchParamsUserSchema.safeParse(values);
    if (!data) throw new ErrorE(error.message);

    const searchedValues: Partial<IUser> = data;
    const users = await userModel.findBy(searchedValues);

    return users[0];
  }

  async findCompleteUser(
    values: Partial<IUser>,
  ): Promise<CompleteUser<Bixo | Republica>> {
    const { data, error } = searchParamsUserSchema.safeParse(values);

    if (!data) throw new ErrorE(error.message);

    const users = await userModel.findBy(data);
    const user = users[0];
    const classData: Bixo | Republica =
      user.class === UserClassesEnum.REPUBLICA
        ? await republicaService.findByUser(user.id)
        : ({} as Bixo); // TODO: add bixo entity

    return Object.assign(user, { classData });
  }

  async findUsersBy(values: Record<string, unknown>) {
    const { data } = searchParamsUserSchema.safeParse(values);
    if (!data) return [];

    const searchedValues: Partial<IUser> = data;

    return userModel.findBy(searchedValues);
  }

  async edit(userId: string, partialUser: EditUserDto) {
    const parsedData = editUserSchema.safeParse(partialUser);
    if (!parsedData.success) throw new ErrorE(parsedData.error.message);
    const { classData, avatarFilename, name } = parsedData.data;

    const user = await this.findUserBy({ id: userId });
    if (!user) throw new ErrorE("User not exists");

    if (classData)
      await republicaService.edit(userId, classData);

    let imageUpload = { presignedUrl: "", filename: "" };
    if (avatarFilename)
      imageUpload = await S3.genPreSignedUrl(`avatars/${userId}`);

    const userToUpdate = {
      name,
      ...(imageUpload.filename && {
        imageUrl: `https://repi-web-s3.s3.us-east-2.amazonaws.com/${imageUpload.filename}`,
      }),
    };

    await userModel.edit(userId, userToUpdate);

    return imageUpload.presignedUrl
      ? { presignedUrl: imageUpload.presignedUrl }
      : {};
  }
}

export const userService = new UserService();
