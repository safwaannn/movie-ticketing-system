const express = require("express");
const router = express.Router();
const db = require("../db");

// GET /api/showtimes/:movie_id
router.get("/:movie_id", async (req, res) => {
  const { movie_id } = req.params;

  try {
    const result = await db.query(
      "SELECT id, show_time FROM showtimes WHERE movie_id = $1 ORDER BY show_time",
      [movie_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
