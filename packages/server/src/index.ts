import "dotenv/config";
import express from "express";
import routes from "./routes.ts";
import { dbClient } from "./db-client.ts";

const app = express();

const PORT = Deno.env.get("SERVER_PORT");

await dbClient.connect();

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
