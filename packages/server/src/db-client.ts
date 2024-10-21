import pg from "pg";

const config: pg.ClientConfig = {
  user: "postgres",
  password: "postgres",
  database: "repi",
};

const dbClient = new pg.Client(config);

export { dbClient };
