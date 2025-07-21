const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres", // Your PostgreSQL username
  host: "localhost",
  database: "movie_booking", // Your database name
  password: "admin123", // Replace with your password
  port: 5432,
});

module.exports = pool;
