import { ITag } from "common";
import { dbClient } from "../../db-client";
import { v4 as uuid } from "uuid";

class TagModel {
  async index(values?: Partial<ITag>) {
    if (!values) return await dbClient("tags").select("*");

    return await dbClient("tags").where(values);
  }

  async assignTagToUser(tag: ITag, userId: string) {
    const [res] = await dbClient("user_tag")
      .insert({
        userId: userId,
        tagId: tag.id,
      })
      .returning(["userId as userId", "tagId as tagId"]);

    return res;
  }

  async getUserTags(userId: string) {
    return await dbClient("users")
      .select("t.id as id", "t.name as name")
      .innerJoin("user_tag as ut", "users.id", "ut.userId")
      .innerJoin("tags as t", "ut.tagId", "t.id")
      .where("users.id", userId);
  }

  async show(values: Partial<ITag>) {
    return await dbClient("tags").where(values).first();
  }

  async store(name: string) {
    const [tag] = await dbClient("tags")
      .insert({
        id: uuid(),
        name: name,
      })
      .returning("*");

    return tag;
  }

  async delete(id: string) {
    await dbClient("tags").where("id", id).delete();
  }
}

export const tagModel = new TagModel();
