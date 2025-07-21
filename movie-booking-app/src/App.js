// src/App.js

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import Register from "./pages/Register";
import BookSeats from "./pages/BookSeats";
import AdminDashboard from "./pages/AdminDashboard";
import AdminShowtimes from "./pages/AdminShowtimes";
import TicketSummary from "./pages/TicketSummary";
import UserDashboard from "./pages/UserDashboard";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected User Routes */}
        <Route
          path="/UserDashboard"
          element={token ? <UserDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/book"
          element={token ? <BookSeats /> : <Navigate to="/login" />}
        />
        <Route
          path="/ticket"
          element={token ? <TicketSummary /> : <Navigate to="/login" />}
        />

        {/* Admin Routes (you can add role check later) */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/showtimes" element={<AdminShowtimes />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Fallback */}
        <Route
          path="*"
          element={<div className="p-8">❌ 404 Page Not Found</div>}
        />
      </Routes>
    </Router>
  );
}

export default App;
