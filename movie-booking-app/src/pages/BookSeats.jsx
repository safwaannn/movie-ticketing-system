import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000/api";

const BookSeats = () => {
  const [movies, setMovies] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedShowtime, setSelectedShowtime] = useState("");
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // Fetch movies on mount
  useEffect(() => {
    fetch(`${API}/movies`)
      .then((res) => res.json())
      .then(setMovies);
  }, []);

  // Fetch showtimes on movie select
  useEffect(() => {
    if (selectedMovie) {
      fetch(`${API}/showtimes/${selectedMovie}`)
        .then((res) => res.json())
        .then(setShowtimes);
    }
  }, [selectedMovie]);

  // Fetch booked seats
  useEffect(() => {
    if (selectedShowtime) {
      fetch(`${API}/booked/${selectedShowtime}`)
        .then((res) => res.json())
        .then(setBookedSeats);
    }
  }, [selectedShowtime]);

  const seatGrid = [
    "A1",
    "A2",
    "A3",
    "A4",
    "A5",
    "B1",
    "B2",
    "B3",
    "B4",
    "B5",
    "C1",
    "C2",
    "C3",
    "C4",
    "C5",
    "D1",
    "D2",
    "D3",
    "D4",
    "D5",
  ];

  const handleBooking = async () => {
    if (!username || !selectedSeat || !selectedMovie || !selectedShowtime) {
      return alert("Fill all fields");
    }

    const res = await fetch(`${API}/book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        movie_id: selectedMovie,
        seat_no: selectedSeat,
        showtime_id: selectedShowtime,
      }),
    });

    if (res.ok) {
      navigate("/ticket", {
        state: {
          username,
          seat_no: selectedSeat,
          movie_id: selectedMovie,
          showtime_id: selectedShowtime,
        },
      });
    } else {
      const msg = await res.text();
      alert("❌ Booking failed: " + msg);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">🎟 Book Your Seat</h1>

      <div className="max-w-xl mx-auto space-y-4 bg-white p-6 rounded shadow">
        {/* Select Movie */}
        <select
          className="w-full border p-2 rounded"
          value={selectedMovie}
          onChange={(e) => {
            setSelectedMovie(e.target.value);
            setSelectedShowtime("");
            setBookedSeats([]);
          }}
        >
          <option value="">🎬 Select Movie</option>
          {movies.map((m) => (
            <option key={m.id} value={m.id}>
              {m.title}
            </option>
          ))}
        </select>

        {/* Select Showtime */}
        {showtimes.length > 0 && (
          <select
            className="w-full border p-2 rounded"
            value={selectedShowtime}
            onChange={(e) => {
              setSelectedShowtime(e.target.value);
              setSelectedSeat("");
            }}
          >
            <option value="">🕒 Select Showtime</option>
            {showtimes.map((s) => (
              <option key={s.id} value={s.id}>
                {formatTime(s.show_time)}
              </option>
            ))}
          </select>
        )}

        {/* Seat Grid */}
        {selectedShowtime && (
          <div className="grid grid-cols-5 gap-2 text-center my-4">
            {seatGrid.map((seat) => (
              <button
                key={seat}
                className={`p-2 rounded border 
                  ${
                    bookedSeats.includes(seat)
                      ? "bg-gray-400 cursor-not-allowed"
                      : selectedSeat === seat
                      ? "bg-green-500 text-white"
                      : "bg-white hover:bg-blue-100"
                  }`}
                disabled={bookedSeats.includes(seat)}
                onClick={() => setSelectedSeat(seat)}
              >
                {seat}
              </button>
            ))}
          </div>
        )}

        {/* User Input & Book */}
        {selectedSeat && (
          <>
            <input
              type="text"
              className="w-full border p-2 rounded mb-2"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              onClick={handleBooking}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Confirm Booking for {selectedSeat}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

function formatTime(timeStr) {
  const [h, m] = timeStr.split(":");
  const hour = parseInt(h);
  const suffix = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${m} ${suffix}`;
}

export default BookSeats;
