import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const API = "http://localhost:5000/api";

const TicketSummary = () => {
  const { state } = useLocation();
  const { username, seat_no, movie_id, showtime_id } = state || {};

  const [movie, setMovie] = useState({});
  const [showtime, setShowtime] = useState("");

  useEffect(() => {
    if (movie_id) {
      fetch(`${API}/movies`)
        .then((res) => res.json())
        .then((data) => {
          const found = data.find((m) => m.id == movie_id);
          setMovie(found || {});
        });
    }

    if (showtime_id) {
      fetch(`${API}/showtimes/${movie_id}`)
        .then((res) => res.json())
        .then((data) => {
          const found = data.find((s) => s.id == showtime_id);
          setShowtime(found?.show_time || "");
        });
    }
  }, [movie_id, showtime_id]);

  if (!username || !seat_no || !movie_id || !showtime_id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <p className="text-red-600 text-lg font-semibold">
          ❌ Invalid ticket data.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="bg-white text-gray-800 rounded-2xl shadow-xl w-full max-w-md px-8 py-10">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          🎫 Ticket Confirmed
        </h1>

        <div className="border-t border-b py-6 space-y-4 text-lg font-medium">
          <div className="flex justify-between">
            <span>Name:</span>
            <span className="text-gray-900">{username}</span>
          </div>
          <div className="flex justify-between">
            <span>Movie:</span>
            <span className="text-gray-900">{movie.title}</span>
          </div>
          <div className="flex justify-between">
            <span>Seat No:</span>
            <span className="text-gray-900">{seat_no}</span>
          </div>
          <div className="flex justify-between">
            <span>Showtime:</span>
            <span className="text-gray-900">{formatTime(showtime)}</span>
          </div>
        </div>

        <div className="mt-6 text-center text-green-600 text-lg font-semibold">
          🎉 Enjoy your show, {username}!
        </div>

        <div className="mt-4 text-center text-sm text-gray-400">
          Movie Ticketing System | © {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
};

function formatTime(timeStr) {
  if (!timeStr) return "N/A";
  const [h, m] = timeStr.split(":");
  const hour = parseInt(h);
  const suffix = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${m} ${suffix}`;
}

export default TicketSummary;
