const env = {
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_HOST: process.env.DB_HOST,
  DB_URL: process.env.DB_URL,
  SERVER_PORT: process.env.SERVER_PORT,
  ENV: process.env.ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  AWS_ACESS_KEY: process.env.AWS_ACESS_KEY,
  AWS_SECRET_ACESS_KEY: process.env.AWS_SECRET_ACESS_KEY,
  AWS_REGION: process.env.AWS_REGION,
  AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
};

Object.keys(env).map((key) => {
  if (!process.env[key])
    throw new Error(`Environment variable not found: ${key}`);
});

export { env };
