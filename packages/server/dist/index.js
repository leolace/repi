import "dotenv/config";
import express from "express";
const app = express();
const PORT = process.env.SERVER_PORT;
app.get("/", (req, res) => {
    res.send("<h1>ola</h1>");
});
app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
