import { userRepository } from "@shared/repositories/user.repository";
import { Bixo, CompleteUser, IUser, Republica, UserClassesEnum } from "common";
import { tagService } from "@modules/tag/tag.service";
import bcrypt from "bcrypt";
import { republicaService } from "@modules/republica/republica.service";
import { S3 } from "@shared/s3";
import { AppError } from "@shared/utils/error";
import { CreateUserDto, createUserSchema } from "./schemas/create";
import { EditUserDto, updateUserSchema } from "./schemas/update";
import { searchParamsUserSchema } from "./schemas/search-params";

class UserService {
  async createUser(user: CreateUserDto) {
    const validatedUser = createUserSchema.parse(user);

    const userAlreadyExists = await userService.findUserBy({
      email: user.email,
    });
    if (userAlreadyExists)
      throw AppError.NotFoundException(
        `E-mail ${user.email} is already in use.`,
      );

    validatedUser.password = await bcrypt.hash(validatedUser.password, 10);
    const createdUser = await userRepository.create(validatedUser);

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
    const res = await userRepository.findAll();

    return res;
  }

  async findUserBy(values: Partial<IUser>) {
    const { data, error } = searchParamsUserSchema.safeParse(values);
    if (!data) throw AppError.BadRequestException(error.message);

    const searchedValues: Partial<IUser> = data;
    const users = await userRepository.findBy(searchedValues);

    return users[0];
  }

  async findCompleteUser(
    values: Partial<IUser>,
  ): Promise<CompleteUser<Bixo | Republica>> {
    const { data, error } = searchParamsUserSchema.safeParse(values);

    if (!data) throw AppError.BadRequestException(error.message);

    const users = await userRepository.findBy(data);
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

    return userRepository.findBy(searchedValues);
  }

  async update(userId: string, dataToUpdate: EditUserDto) {
    const parsedData = updateUserSchema.safeParse(dataToUpdate);
    if (!parsedData.success)
      throw AppError.BadRequestException(parsedData.error.message);
    const { classData, avatarFilename, name } = parsedData.data;

    const user = await this.findUserBy({ id: userId });
    if (!user) throw AppError.NotFoundException("User not exists");

    if (classData) await republicaService.edit(userId, classData);

    let imageUpload = { presignedUrl: "", filename: "" };
    if (avatarFilename)
      imageUpload = await S3.genPreSignedUrl(`avatars/${userId}`);

    const userToUpdate = {
      name,
      ...(imageUpload.filename && {
        imageUrl: `https://repi-web-s3.s3.us-east-2.amazonaws.com/${imageUpload.filename}`,
      }),
    };

    await userRepository.update(userId, userToUpdate);

    return imageUpload.presignedUrl
      ? { presignedUrl: imageUpload.presignedUrl }
      : {};
  }
}

export const userService = new UserService();
