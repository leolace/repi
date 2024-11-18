import { CreateUserDto, LoginUserDto } from "./auth.dto";
import { dbClient } from "@db-client";
import { ILogin, IUser } from "common";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";
import { env } from "@env";

class AuthModel {
  async store(user: CreateUserDto) {
    const { rows } = await dbClient.query<IUser>(
      `INSERT INTO "user"(id, name, email, password, class) VALUES($1, $2, $3, $4, $5) RETURNING id, name, email, class`,
      [uuid(), user.name, user.email, user.password, user.class]
    );

    return rows[0];
  }

  async login(userId: string) {
    const token = jwt.sign({ userId: userId }, env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const { rows } = await dbClient.query<ILogin>(
      "INSERT INTO sessions(id, user_id, token) VALUES($1, $2, $3) RETURNING token",
      [uuid(), userId, token]
    );

    return rows[0];
  }
}

export const authModel = new AuthModel();
