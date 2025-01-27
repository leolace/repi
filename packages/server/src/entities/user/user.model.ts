import { IUser, IUserJWTPayload, UserClassesEnum } from "common";
import { dbClient } from "@db-client";
import { CreateUserDto, EditUserDto } from "./user.dto";
import { v4 as uuid } from "uuid";
import { republicaModel } from "@entities/republica/republica.model";

class UserModel {
  async store(user: CreateUserDto) {
    const [row] = await dbClient<IUser & { password: string }>("users")
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

  async findAll() {
    return await dbClient("users").select(
      "name",
      "email",
      "class",
      "id",
      "imageUrl",
    );
  }

  async findBy(values: Partial<IUser>) {
    // const searchedValues = Object.keys(values)
    //   .map((key, index) => {
    //     return `${key}=$${index + 1}`;
    //   })
    //   .join(" AND ");

    // const query = `SELECT email, class, id, name, "imageUrl" FROM users WHERE ${searchedValues}`;

    const user = await dbClient<IUser>("users").where(values).select("*");

    // const { rows } = await dbClient.query<IUser>(query, Object.values(values));

    return user;
  }

  async getPassword(userId: string): Promise<string> {
    const row = await dbClient<IUser>("users")
      .select("password")
      .where({ id: userId })
      .first();

    return row.password;
  }

  async getSelf({ userId, class: userClass }: IUserJWTPayload) {
    const [user] = await this.findBy({ id: userId });
    const classData =
      userClass === UserClassesEnum.REPUBLICA
        ? await republicaModel.findByUser(userId)
        : {};

    return { ...user, classData };
  }

  async edit(userId: string, userEditValues: EditUserDto) {
    const editedUser = await dbClient<IUser>("users")
      .where({ id: userId })
      .update(userEditValues)
      .returning("*")
      .then((rows) => rows[0]);

    if ("password" in editedUser) delete editedUser.password;

    return editedUser;
  }
}

export const userModel = new UserModel();
