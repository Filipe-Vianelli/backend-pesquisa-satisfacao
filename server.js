const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.post("/voto", async (req, res) => {
  const { emoji, setor, timestamp, userAgent } = req.body;

  try {
    await pool.query(
      "INSERT INTO votos (emoji, setor, timestamp, user_agent) VALUES ($1, $2, $3, $4)",
      [emoji, setor, timestamp, userAgent]
    );
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao salvar voto");
  }
});

app.get("/", (req, res) => {
  res.send("API de votação online!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Rodando na porta", port));