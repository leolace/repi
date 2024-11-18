import { ErrorE } from "@utils/error";

if (!process.env.JWT_SECRET) throw new ErrorE("JWT_SECRET not set.");

const env = {
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_HOST: process.env.DB_HOST,
  DB_URL: process.env.DB_URL,
  PORT: process.env.SERVER_PORT,
  ENV: process.env.ENV,
  JWT_SECRET: process.env.JWT_SECRET,
};

export { env };
