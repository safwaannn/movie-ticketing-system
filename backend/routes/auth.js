const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");
const router = express.Router();

const SECRET = "your_jwt_secret"; // 🔐 Move to .env later

// Register Route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
      [username, email, hashed]
    );

    res.status(201).json({ message: "User registered!" });
  } catch (err) {
    if (err.code === "23505") {
      res.status(400).json({ error: "Email already in use" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0)
      return res.status(400).json({ error: "Invalid email" });

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ error: "Incorrect password" });

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET, {
      expiresIn: "2h",
    });

    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, username: user.username, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
