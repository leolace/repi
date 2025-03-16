import "dotenv/config";
import type { Knex } from "knex";
import { env } from "@utils/environment";

const ssl = env.ENV === "prod" && {
  ssl: {
    rejectUnauthorized: false,
  },
};

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      host: env.DB_HOST,
      database: env.DB_DATABASE,
      ...ssl,
    },
    migrations: {
      directory: "./src/database/migrations", // Pasta onde as migrações serão armazenadas
    },
    seeds: {
      directory: "./src/database/seeds", // Pasta onde os seeds serão armazenados
    },
  },

  // staging: {
  //   client: "postgresql",
  //   connection: {
  //     database: "my_db",
  //     user: "username",
  //     password: "password",
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: "knex_migrations",
  //   },
  // },

  // production: {
  //   client: "postgresql",
  //   connection: {
  //     database: "my_db",
  //     user: "username",
  //     password: "password",
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: "knex_migrations",
  //   },
  // },
};

export default config;
