import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Optional: Save token or user in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect to user dashboard
        navigate("/UserDashboard");
      } else {
        alert(`❌ ${data.error}`);
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center flex items-center gap-2">
          🔐 User Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div className="flex justify-between mt-4 text-sm text-blue-600">
          <button
            onClick={() => navigate("/register")}
            className="flex items-center gap-1"
          >
            ➕ Register
          </button>
          <button
            onClick={() => alert("Forgot password flow")}
            className="flex items-center gap-1"
          >
            🔑 Forgot Password?
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/admin/login")}
            className="text-purple-600 hover:underline flex items-center gap-1 mx-auto"
          >
            🛠 Admin Panel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
