const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();

// ✅ Allow requests from frontend
app.use(cors({
  origin: "*", // or use "http://localhost:5173" or "http://mern.local"
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.use(bodyParser.json());

const pool = new Pool({
  host: "postgres",
  user: "user",
  password: "password",
  database: "usersdb",
  port: 5432,
});

app.post("/users", async (req, res) => {
  const { name } = req.body;
  await pool.query("INSERT INTO users (name) VALUES ($1)", [name]);
  res.send("User added");
});

app.get("/users", async (req, res) => {
  const result = await pool.query("SELECT * FROM users");
  res.json(result.rows);
});

app.listen(5000, () => {
  console.log("✅ Backend running on http://localhost:5000");
});
