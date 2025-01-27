import knex from "knex";
import config from "../knexfile";

export const dbClient = knex(config["development"]);
