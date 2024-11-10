export const env = {
  DB_USER: Deno.env.get("DB_USER"),
  DB_PASSWORD: Deno.env.get("DB_PASSWORD"),
  DB_DATABASE: Deno.env.get("DB_DATABASE"),
  DB_HOST: Deno.env.get("DB_HOST"),
  DB_URL: Deno.env.get("DB_URL"),
  PORT: Deno.env.get("SERVER_PORT"),
};
