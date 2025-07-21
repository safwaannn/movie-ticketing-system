import React from "react";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          👋 Welcome,{" "}
          <span className="text-indigo-600">{user?.username || "Guest"}</span>
        </h1>

        <div className="flex flex-col gap-4 mt-6">
          <Link
            to="/book"
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium py-3 rounded-lg text-center transition"
          >
            🎟 Book a Movie Ticket
          </Link>

          <Link
            to="/ticket"
            className="bg-green-600 hover:bg-green-700 text-white text-lg font-medium py-3 rounded-lg text-center transition"
          >
            📃 View Your Ticket
          </Link>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            className="bg-red-500 hover:bg-red-600 text-white text-lg font-medium py-3 rounded-lg transition"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
