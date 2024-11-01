import { ITag, IUser } from "common";
import { dbClient } from "../db-client.ts";

type UserTag = { userId: Pick<IUser, "id">; tagId: Pick<ITag, "id"> };

class UserModel {
  async assignTagToUser(userId: string, tagId: string) {
    const query = `INSERT INTO user_tag (user_id, tag_id) VALUES ($1, $2) RETURNING *`;

    const res = await dbClient.query<UserTag>(query, [userId, tagId]);

    return res.rows[0];
  }

  async getUserTags(userId: string) {
    const { rows } = await dbClient.query<ITag>(
      ` SELECT t.id AS id, t.name AS name 
        FROM "user" u
        INNER JOIN user_tag ut ON u.id = ut.user_id
        INNER JOIN tag t ON ut.tag_id = t.id
        WHERE u.id = $1`,
      [userId],
    );

		console.log(rows);

    return rows;
  }
}

export const userModel = new UserModel();
