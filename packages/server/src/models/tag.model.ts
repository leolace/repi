import { ITag } from "common";
import { dbClient } from "../db-client.ts";
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
