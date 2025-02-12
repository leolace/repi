declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_USER: string;
      DB_PASSWORD: string;
      DB_DATABASE: string;
      DB_HOST: string;
      DB_URL: string;
      SERVER_PORT: string;
      ENV: string;
      JWT_SECRET: string;
      API_ENDPOINT: string;
      AWS_ACESS_KEY: string;
      AWS_SECRET_ACESS_KEY: string;
      AWS_REGION: string;
      AWS_S3_BUCKET_NAME: string;
    }
  }
}

export {};
