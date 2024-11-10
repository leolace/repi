import pg from "pg";
import { env } from "./env";

const config: pg.ClientConfig = {
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  host: env.DB_HOST,
  database: env.DB_DATABASE,
  ssl: {
    rejectUnauthorized: false
  },
};

const dbClient = new pg.Client(config);

export { dbClient };
