import { IUser, IUserJWTPayload, UserClassesEnum } from "common";
import { knex } from "@database/knex";
import { v4 as uuid } from "uuid";
import { republicaRepository } from "@shared/repositories/republica.repository";
import { CreateUserDto } from "@modules/user/schemas/create";
import { EditUserDto } from "@modules/user/schemas/update";

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
    const user = await knex<IUser>("users").where(values).select("*");

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

  async update(userId: string, dataToUpdate: EditUserDto) {
    const editedUser = await knex<IUser>("users")
      .where({ id: userId })
      .update(dataToUpdate)
      .returning("*")
      .then((rows) => rows[0]);

    if ("password" in editedUser) delete editedUser.password;

    return editedUser;
  }
}

export const userRepository = new UserRepository();
