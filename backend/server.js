const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const movieRoutes = require("./routes/movies");
const adminRoutes = require("./routes/admin");
const showtimeRoutes = require("./routes/showtimes");

const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Mount routes BEFORE listen
app.use("/api", movieRoutes);
app.use("/api/admin", adminRoutes);

app.use("/api/showtimes", showtimeRoutes);
app.use("/api/auth", authRoutes);

// 👈 Move this here

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
// before app.listen
