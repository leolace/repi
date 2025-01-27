import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("user_tag", (table) => {
    table
      .uuid("userId")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .uuid("tagId")
      .notNullable()
      .references("id")
      .inTable("tags")
      .onDelete("CASCADE");
    table.primary(["userId", "tagId"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("user_tag");
}
