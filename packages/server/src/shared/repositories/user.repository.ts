import { knex } from "@database/knex";
import { CreateUserDto } from "@modules/user/schemas/create";
import { republicaRepository } from "@shared/repositories/republica.repository";
import { IUser, IUserJWTPayload, UserClassesEnum } from "common";
import fs from "fs";
import { v4 as uuid } from "uuid";
import { s3Repository } from "./s3.repository";

class UserRepository {
  async create(user: CreateUserDto) {
    const [row] = await knex<IUser & { password: string }>("users")
      .insert({
        id: uuid(),
        name: user.name,
        email: user.email,
        password: user.password,
        class: user.class,
      })
      .returning(["id", "name", "email", "class"]);

    return row;
  }

  async findAll(): Promise<IUser[]> {
    return await knex("users").select(
      "name",
      "email",
      "class",
      "id",
      "imageUrl",
    );
  }

  async findBy(values: Partial<IUser>) {
    const user = await knex<IUser>("users")
      .where(values)
      .select("name", "email", "class", "id", "imageUrl");

    return user;
  }

  async getPassword(userId: string): Promise<string> {
    const row = await knex<IUser>("users")
      .select("password")
      .where({ id: userId })
      .first();

    return row.password;
  }

  async getComplete({ userId, class: userClass }: IUserJWTPayload) {
    const [user] = await this.findBy({ id: userId });
    const classData =
      userClass === UserClassesEnum.REPUBLICA
        ? await republicaRepository.findByUser(userId)
        : {};

    return { ...user, classData };
  }

  async update(userId: string, dataToUpdate: Partial<IUser>) {
    const editedUser = await knex<IUser>("users")
      .where({ id: userId })
      .update(dataToUpdate)
      .returning("*")
      .then((rows) => rows[0]);

    if ("password" in editedUser) delete editedUser.password;

    return editedUser;
  }

  saveAvatarToS3(userId: string, file: Express.Multer.File) {
    const fileStream = fs.createReadStream(file.path);
    const filename = `avatars/${userId}`;
    const fileSize = fs.statSync(file.path).size;

    return s3Repository.upload(fileStream, filename, {
      ContentType: file.mimetype,
      ContentLength: fileSize,
    });
  }
}

export const userRepository = new UserRepository();
