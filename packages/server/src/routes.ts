import express from "express";
import { dbClient } from "./db-client.ts";

const router = express.Router();

router.get("/users/get", async (req, res) => {
  const data = await dbClient.query("SELECT * FROM users;");
  console.log(data.rows);
  res.json(data.rows);
});

router.get("/users/post", async (req, res) => {
  const data = await dbClient.query(
    "INSERT INTO users (name, email, password, class) VALUES ('carlos', 'carlos@gmail.com', 'carlinhos1233', 'BIXO');",
  );
  console.log(data.rows);
  res.json(data.rows);
});

export default router;
