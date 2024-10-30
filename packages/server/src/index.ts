import "dotenv/config";
import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import routes from "./routes.ts";
import { dbClient } from "./db-client.ts";
import { authRoutes } from "./routes/auth-routes.ts";
import { corsMiddleware } from "./middlewares/cors.middleware.ts";
import { ErrorE } from "./utils/error.ts";

const PORT = Deno.env.get("SERVER_PORT");

try {
  await dbClient.connect();
} catch (e) {
  console.error("Connection to DB failed.", e);
}

const app = express();
app.use(express.json());
app.use(corsMiddleware);

app.use([routes, authRoutes]);

app.use((err: ErrorE, _: Request, res: Response, __: NextFunction) => {
  console.error(err.stack);
  res.status(err.statusCode).json({ status: err.statusCode, error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
