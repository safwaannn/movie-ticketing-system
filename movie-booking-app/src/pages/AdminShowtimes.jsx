import React, { useEffect, useState } from "react";

const API = "http://localhost:5000/api";

const AdminShowtimes = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [showtimes, setShowtimes] = useState([]);
  const [newTime, setNewTime] = useState("");

  // Load all movies
  useEffect(() => {
    fetch(`${API}/movies`)
      .then((res) => res.json())
      .then(setMovies);
  }, []);

  // Load showtimes when movie is selected
  useEffect(() => {
    if (selectedMovieId) {
      fetch(`${API}/showtimes/${selectedMovieId}`)
        .then((res) => res.json())
        .then(setShowtimes);
    }
  }, [selectedMovieId]);

  const addShowtime = async () => {
    if (!selectedMovieId || !newTime) return;

    await fetch(`${API}/admin/showtimes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movie_id: selectedMovieId, show_time: newTime }),
    });

    setNewTime("");
    // Refresh showtimes
    const res = await fetch(`${API}/showtimes/${selectedMovieId}`);
    const data = await res.json();
    setShowtimes(data);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🕒 Manage Showtimes
      </h1>

      <div className="bg-white p-6 rounded shadow mb-6 max-w-xl mx-auto">
        <label className="block mb-2 font-medium">Select Movie</label>
        <select
          value={selectedMovieId}
          onChange={(e) => setSelectedMovieId(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="">-- Choose Movie --</option>
          {movies.map((m) => (
            <option key={m.id} value={m.id}>
              {m.title}
            </option>
          ))}
        </select>

        {selectedMovieId && (
          <>
            <label className="block mb-2 font-medium">
              Add New Showtime (HH:MM)
            </label>
            <div className="flex gap-2 mb-4">
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="p-2 border rounded flex-1"
              />
              <button
                onClick={addShowtime}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add
              </button>
            </div>

            <h3 className="font-semibold mb-2">Existing Showtimes:</h3>
            {showtimes.length > 0 ? (
              <ul className="list-disc list-inside space-y-1">
                {showtimes.map((st) => (
                  <li key={st.id}>{formatTime(st.show_time)}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No showtimes yet.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

function formatTime(timeStr) {
  const [hour, minute] = timeStr.split(":");
  const h = parseInt(hour);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${minute} ${suffix}`;
}

export default AdminShowtimes;
