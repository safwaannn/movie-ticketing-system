const express = require("express");
const router = express.Router();
const db = require("../db");

// POST /api/admin/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await db.query("SELECT * FROM admins WHERE username = $1", [
      username,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const admin = result.rows[0];

    if (admin.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.json({
      message: "Login successful",
      admin: { id: admin.id, username: admin.username },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

// POST /api/admin/movies
router.post("/movies", async (req, res) => {
  const { title, description } = req.body;
  try {
    await db.query("INSERT INTO movies (title, description) VALUES ($1, $2)", [
      title,
      description,
    ]);
    res.status(201).json({ message: "Movie added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/admin/movies/:id
router.put("/movies/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    await db.query(
      "UPDATE movies SET title = $1, description = $2 WHERE id = $3",
      [title, description, id]
    );
    res.json({ message: "Movie updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/admin/movies/:id
router.delete("/movies/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM movies WHERE id = $1", [id]);
    res.json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// showtime
// POST /api/admin/showtimes
router.post("/showtimes", async (req, res) => {
  const { movie_id, show_time } = req.body;

  try {
    await db.query(
      "INSERT INTO showtimes (movie_id, show_time) VALUES ($1, $2)",
      [movie_id, show_time]
    );
    res.status(201).json({ message: "Showtime added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
