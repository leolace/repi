import { knex } from "@database/knex";
import { ITag } from "common";
import { v4 as uuid } from "uuid";

class TagRepository {
  async index(values?: Partial<ITag>) {
    if (!values) return await knex("tags").select("*");

    return await knex("tags").where(values);
  }

  async assignTagToUser(tag: ITag, userId: string) {
    const [res] = await knex("user_tag")
      .insert({
        userId: userId,
        tagId: tag.id,
      })
      .returning(["userId as userId", "tagId as tagId"]);

    return res;
  }

  async getUserTags(userId: string) {
    return await knex("users")
      .select("t.id as id", "t.name as name")
      .innerJoin("user_tag as ut", "users.id", "ut.userId")
      .innerJoin("tags as t", "ut.tagId", "t.id")
      .where("users.id", userId);
  }

  async show(values: Partial<ITag>) {
    return await knex("tags").where(values).first();
  }

  async store(name: string) {
    const [tag] = await knex("tags")
      .insert({
        id: uuid(),
        name: name,
      })
      .returning("*");

    return tag;
  }

  async delete(id: string) {
    await knex("tags").where("id", id).delete();
  }
}

export const tagRepository = new TagRepository();
