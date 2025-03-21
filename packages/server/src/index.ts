import "dotenv/config";
import express from "express";
import { authRoutes, tagRoutes, userRoutes } from "./routes/index";
import { corsMiddleware } from "./middlewares/cors.middleware";
import { env } from "@utils/environment";
import { errorMiddleware } from "@middlewares/error.middleware";
import { republicaRoutes } from "@routes/republica.routes";

const app = express();
app.use(express.json());
app.use(corsMiddleware);

app.use([authRoutes, userRoutes, republicaRoutes, tagRoutes]);

app.use(errorMiddleware);

app.listen(env.SERVER_PORT, () => {
  console.log(`Server is listening on http://localhost:${env.SERVER_PORT}`);
});
