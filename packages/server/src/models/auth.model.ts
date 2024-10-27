import { CreateUserDto } from "../dtos/auth.dto.ts";
import { dbClient } from "../db-client.ts";
import { IUser } from "common";

class AuthModel {
  async findAll() {
    const res = await dbClient.query<IUser>(
      "SELECT name, email, class FROM users;",
    );

    return res.rows;
  }

  async findBy(values: Partial<IUser>) {
    const searchedValues = Object.keys(values)
      .map((key, index) => {
        return `${key}=$${index + 1}`;
      })
      .join(" AND ");

    const query = `SELECT name, email, class FROM users WHERE ${searchedValues}`;
    const res = await dbClient.query<IUser>(query, Object.values(values));

    return res.rows;
  }

  async store(user: CreateUserDto) {
    const { rows } = await dbClient.query<IUser>(
      "INSERT INTO users(name, email, password, class) VALUES($1, $2, $3, $4) RETURNING name, email, class",
      [user.name, user.email, user.password, user.class],
    );

    return rows[0];
  }
}

export const authModel = new AuthModel();
