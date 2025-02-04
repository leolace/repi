import knexRegister from "knex";
import config from "../../knexfile";

export const knex = knexRegister(config["development"]);
