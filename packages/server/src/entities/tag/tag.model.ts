import { ITag } from "common";
import { dbClient } from "../../db-client.ts";
import { v4 as uuid } from "uuid";

class TagModel {
  async index(values?: Partial<ITag>) {
    if (!values) {
      const query = "SELECT * FROM tag";
      const tags = await dbClient.query<ITag>(query);

      return tags.rows;
    }

    const searchedValues = Object.keys(values)
      .map((key, index) => {
        return `${key}=$${index + 1}`;
      })
      .join(" AND ");

    const query = `SELECT * FROM tag WHERE ${searchedValues}`;
    const tags = await dbClient.query<ITag>(query, Object.values(values));

    return tags.rows;
  }

  async assignTagToUser(userId: string, tagId: string) {
    const query = `INSERT INTO user_tag (user_id, tag_id) VALUES ($1, $2) RETURNING user_id AS userId, tag_id AS tagId`;

    const res = await dbClient.query<{ userId: string; tagId: string }>(query, [
      userId,
      tagId,
    ]);

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

    return rows;
  }

  async show(values: Partial<ITag>) {
    const searchedValues = Object.keys(values)
      .map((key, index) => {
        return `${key}=$${index + 1}`;
      })
      .join(" AND ");

    const query = `SELECT * FROM tag WHERE ${searchedValues}`;
    const tag = await dbClient.query<ITag>(query, Object.values(values));

    return tag.rows[0];
  }

  async store(name: string) {
    const query = "INSERT INTO tag(id, name) VALUES ($1, $2) RETURNING *";

    const tag = await dbClient.query<ITag>(query, [uuid(), name]);

    return tag.rows[0];
  }

  async delete(id: string) {
    const query = "DELETE FROM tag WHERE id = $1";

    await dbClient.query<ITag>(query, [id]);
  }
}

export const tagModel = new TagModel();
