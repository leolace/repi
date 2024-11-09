export const env = {
  DB_USER: Deno.env.get("DB_USER"),
  DB_PASSWORD: Deno.env.get("DB_PASSWORD"),
  DB_DATABASE: Deno.env.get("DB_DATABASE"),
  PORT: Deno.env.get("SERVER_PORT"),
};
