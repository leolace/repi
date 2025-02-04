import { Session } from "./auth.dto";
import { knex } from "@database/knex";
import { v4 as uuid } from "uuid";

class AuthModel {
  async login(userId: string, token: string) {
    const [row] = await knex<Session>("sessions")
      .insert({
        id: uuid(),
        userId: userId,
        token: token,
      })
      .returning("token");

    return row;
  }

  async getUserSession(userId: string) {
    const row = await knex<Session>("sessions")
      .select("*")
      .where({ userId })
      .first();

    return row;
  }

  async deleteSession(sessionId: string) {
    await knex<Session>("sessions").where({ id: sessionId }).delete();
  }
}

export const authModel = new AuthModel();
