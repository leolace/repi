import { IUser, IUserJWTPayload, Republica, UserClassesEnum } from "common";
import { dbClient } from "@db-client";
import { CreateUserDto } from "./user.dto";
import { v4 as uuid } from "uuid";
import { republicaModel } from "@entities/republica/republica.model";
import { unRawRepublicaData } from "@entities/republica/republica.utils";

class UserModel {
  async store(user: CreateUserDto) {
    const { rows } = await dbClient.query<IUser>(
      `INSERT INTO users(id, name, email, password, class) VALUES($1, $2, $3, $4, $5) RETURNING id, name, email, class`,
      [uuid(), user.name, user.email, user.password, user.class]
    );

    return rows[0];
  }

  async findAll() {
    const res = await dbClient.query<IUser>(
      `SELECT name, email, class, id FROM users;`
    );

    return res.rows;
  }

  async findBy(values: Partial<IUser>) {
    const searchedValues = Object.keys(values)
      .map((key, index) => {
        return `${key}=$${index + 1}`;
      })
      .join(" AND ");

    const query = `SELECT email, class, id, name FROM users WHERE ${searchedValues}`;
    const { rows } = await dbClient.query<IUser>(query, Object.values(values));

    return rows;
  }

  async getPassword(userId: string): Promise<string> {
    const { rows } = await dbClient.query<{ password: string }>(
      `SELECT password FROM users WHERE id = $1`,
      [userId]
    );

    return rows[0].password;
  }

  async getSelf({ userId, class: userClass }: IUserJWTPayload) {
    const [user] = await this.findBy({ id: userId });
    let userData = null;

    if (userClass === UserClassesEnum.REPUBLICA) {
      const republica = await republicaModel.findByUser(userId);
      userData = republica;
    } else {
      userData = {};
    }

    return { ...user, userData };
  }
}

export const userModel = new UserModel();
