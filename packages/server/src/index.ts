import "dotenv/config";
import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { dbClient } from "./db-client";
import { authRoutes, tagRoutes, userRoutes } from "./routes/index";
import { corsMiddleware } from "./middlewares/cors.middleware";
import { ErrorE } from "./utils/error";
import { env } from "common";

try {
  dbClient.connect();
} catch (e) {
  console.error(e);
  throw new ErrorE("Connection to DB failed.");
}

const app = express();
app.use(express.json());
app.use(corsMiddleware);

// unauthenticated endpoints
app.use([authRoutes, userRoutes]);

// authenticated endpoints
app.use([tagRoutes]);

app.use((err: ErrorE, req: Request, res: Response, __: NextFunction) => {
  console.log(req.url, err.stack);
  res
    .status(err.statusCode || 500)
    .json({ status: err.statusCode, error: err.message, path: req.url });
});

app.listen(env.PORT, () => {
  console.log(`Server is listening on http://localhost:${env.PORT}`);
});
