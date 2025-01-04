import { IUser } from "common";
import { dbClient } from "@db-client";

class UserModel {
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
}

export const userModel = new UserModel();
