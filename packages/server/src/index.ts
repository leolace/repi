import "dotenv/config";
import "express-async-errors";
import express from "express";
import { dbClient } from "./db-client";
import { authRoutes, tagRoutes, userRoutes } from "./routes/index";
import { corsMiddleware } from "./middlewares/cors.middleware";
import { ErrorE } from "./utils/error";
import { env } from "common/src/environment.server";
import { errorMiddleware } from "@middlewares/error.middleware";
import { republicaRoutes } from "@routes/republica.routes";

try {
  dbClient.connect();
} catch (e) {
  console.error(e);
  throw new ErrorE("Connection to DB failed.");
}

const app = express();
app.use(express.json());
app.use(corsMiddleware);

app.use([authRoutes, userRoutes, republicaRoutes, tagRoutes]);

app.use(errorMiddleware);

app.listen(env.PORT, () => {
  console.log(`Server is listening on http://localhost:${env.PORT}`);
});
