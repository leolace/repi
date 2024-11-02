import { CreateUserDto } from "./auth.dto.ts";
import { dbClient } from "../../db-client.ts";
import { IUser } from "common";
import { v4 as uuid } from "uuid";

class AuthModel {
  async store(user: CreateUserDto) {
    const { rows } = await dbClient.query<IUser>(
      `INSERT INTO "user"(id, name, email, password, class) VALUES($1, $2, $3, $4, $5) RETURNING id, name, email, class`,
      [uuid(), user.name, user.email, user.password, user.class],
    );

    return rows[0];
  }
}

export const authModel = new AuthModel();
