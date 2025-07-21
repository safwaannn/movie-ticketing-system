const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all movies
router.get("/movies", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM movies");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Book a seat
router.post("/book", async (req, res) => {
  const { username, movie_id, seat_no } = req.body;
  try {
    await db.query(
      "INSERT INTO bookings (username, movie_id, seat_no) VALUES ($1, $2, $3)",
      [username, movie_id, seat_no]
    );
    res.send("Booking confirmed!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router; // ← This must be here

router.post("/book", async (req, res) => {
  const { username, movie_id, seat_no, showtime_id } = req.body;

  try {
    // Optional: check if seat already booked
    const check = await db.query(
      "SELECT * FROM bookings WHERE showtime_id = $1 AND seat_no = $2",
      [showtime_id, seat_no]
    );
    if (check.rows.length > 0) {
      return res.status(400).send("Seat already booked");
    }

    await db.query(
      "INSERT INTO bookings (username, movie_id, seat_no, showtime_id) VALUES ($1, $2, $3, $4)",
      [username, movie_id, seat_no, showtime_id]
    );
    res.send("Booking confirmed!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/booked/:showtime_id", async (req, res) => {
  const { showtime_id } = req.params;

  try {
    const result = await db.query(
      "SELECT seat_no FROM bookings WHERE showtime_id = $1",
      [showtime_id]
    );
    res.json(result.rows.map((r) => r.seat_no));
  } catch (err) {
    res.status(500).send(err.message);
  }
});
