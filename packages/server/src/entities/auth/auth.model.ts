import { UserSession } from "./auth.dto";
import { dbClient } from "@db-client";
import { IToken } from "common";
import { v4 as uuid } from "uuid";

class AuthModel {
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

    if (rows.length === 0) return null;

    return rows[0];
  }

  async deleteSession(sessionId: string) {
    await dbClient.query("DELETE FROM sessions WHERE id = $1", [sessionId]);

    return;
  }
}

export const authModel = new AuthModel();
