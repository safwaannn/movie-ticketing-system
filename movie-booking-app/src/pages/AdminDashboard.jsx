import React, { useEffect, useState } from "react";

const API = "http://localhost:5000/api";

const AdminDashboard = () => {
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    show_time: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchMovies = () => {
    fetch(`${API}/movies`)
      .then((res) => res.json())
      .then(setMovies);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `${API}/admin/movies/${editId}`
      : `${API}/admin/movies`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ title: "", description: "", show_time: "" });
    setEditId(null);
    fetchMovies();
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/admin/movies/${id}`, { method: "DELETE" });
    fetchMovies();
  };

  const startEdit = (movie) => {
    setForm({
      title: movie.title,
      description: movie.description,
      show_time: movie.show_time || "",
    });
    setEditId(movie.id);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🎬 Admin Dashboard
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow mb-6"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editId ? "✏️ Edit Movie" : "➕ Add New Movie"}
        </h2>

        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Movie Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <textarea
          className="w-full mb-3 p-2 border rounded"
          placeholder="Movie Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        <input
          type="time"
          className="w-full mb-3 p-2 border rounded"
          value={form.show_time}
          onChange={(e) => setForm({ ...form, show_time: e.target.value })}
          required
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editId ? "Update Movie" : "Add Movie"}
        </button>
      </form>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{movie.title}</h3>
            <p className="text-gray-600 mb-1">{movie.description}</p>
            {movie.show_time && (
              <p className="text-sm text-blue-600 font-medium">
                Showtime: {movie.show_time}
              </p>
            )}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => startEdit(movie)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(movie.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
