import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("republicas", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    table
      .uuid("userId")
      .notNullable()
      .references("id")
      .inTable("users")
      .unique();
    table.string("class", 15).notNullable();
    table.decimal("rentalValue", 10, 2).defaultTo(0.0);
    table.integer("occupantsCount").defaultTo(0);
    table.integer("postsCount").defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("republicas");
}
