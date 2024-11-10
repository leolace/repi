import pg from "pg";
import { env } from "./env.ts";

const config: pg.ClientConfig = {
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  host: env.DB_HOST,
  ssl: {
    rejectUnauthorized: false,
  }
};

const dbClient = new pg.Client(config);

export { dbClient };
