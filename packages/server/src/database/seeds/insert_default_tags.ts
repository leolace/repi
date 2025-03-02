import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("tags").del();

  await knex("tags").insert([
    { name: "ACADEMIA" },
    { name: "SUPERMERCADO" },
    { name: "PARQUE" },
    { name: "VIDEOGAME" },
    { name: "SALA_DE_ESTUDOS" },
    { name: "STREAMINGS" },
    { name: "PETS" },
  ]);
}
