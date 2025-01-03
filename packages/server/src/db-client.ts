import pg from "pg";
import { env } from "common/src/environment.server";

const ssl =
  env.ENV === "prod"
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : undefined;

const config: pg.ClientConfig = {
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  host: env.DB_HOST,
  database: env.DB_DATABASE,
  ...ssl,
};

const dbClient = new pg.Client(config);

export { dbClient };
