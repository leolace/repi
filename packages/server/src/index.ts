import "dotenv/config";
import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { dbClient } from "./db-client";
import { authRoutes, tagRoutes, userRoutes } from "./routes/index";
import { corsMiddleware } from "./middlewares/cors.middleware";
import { ErrorE } from "./utils/error";
import { env } from "./env";

try {
  await dbClient.connect();
} catch (e) {
  console.error(e);
  throw new Error("Connection to DB failed.");
}

const app = express();
app.use(express.json());
app.use(corsMiddleware);

app.use([authRoutes, tagRoutes, userRoutes]);

app.use((err: ErrorE, _: Request, res: Response, __: NextFunction) => {
  console.log(err.stack);
  res
    .status(err.statusCode || 500)
    .json({ status: err.statusCode, error: err.message });
});

app.listen(env.PORT, () => {
  console.log(`Server is listening on http://localhost:${env.PORT}`);
});
