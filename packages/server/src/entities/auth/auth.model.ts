import { CreateUserDto, UserSession } from "./auth.dto";
import { dbClient } from "@db-client";
import { IToken, IUser } from "common";
import { v4 as uuid } from "uuid";

class AuthModel {
  async store(user: CreateUserDto) {
    const { rows } = await dbClient.query<IUser>(
      `INSERT INTO "user"(id, name, email, password, class) VALUES($1, $2, $3, $4, $5) RETURNING id, name, email, class`,
      [uuid(), user.name, user.email, user.password, user.class]
    );

    return rows[0];
  }

  async login(userId: string, token: string) {
    const { rows } = await dbClient.query<IToken>(
      "INSERT INTO sessions(id, user_id, token) VALUES($1, $2, $3) RETURNING token",
      [uuid(), userId, token]
    );

    return rows[0];
  }

  async getUserSession(userId: string) {
    const { rows } = await dbClient.query<UserSession>(
      "SELECT * FROM sessions WHERE user_id = $1",
      [userId]
    );

    return rows[0];
  }

  async deleteSession(sessionId: string) {
    await dbClient.query("DELETE FROM sessions WHERE id = $1", [sessionId]);

    return;
  }
}

export const authModel = new AuthModel();
