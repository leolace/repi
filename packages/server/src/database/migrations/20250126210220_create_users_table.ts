import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"");

  await knex.schema.createTable("users", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    table.text("name").notNullable();
    table.text("email").notNullable().unique();
    table.text("password").notNullable();
    table.string("class", 15).notNullable();
    table.text("imageUrl");
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users");
  await knex.raw("DROP EXTENSION IF EXISTS \"uuid-ossp\"");
}
