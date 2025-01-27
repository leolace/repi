const env = {
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_HOST: process.env.DB_HOST,
  DB_URL: process.env.DB_URL,
  PORT: process.env.SERVER_PORT,
  ENV: process.env.ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  API_ENDPOINT: process.env.PUBLIC_API_ENDPOINT,
  AWS_ACESS_KEY: process.env.AWS_ACESS_KEY,
  AWS_SECRET_ACESS_KEY: process.env.AWS_SECRET_ACESS_KEY,
} as Record<string, string>;

export { env };
