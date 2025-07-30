import React, { useState, useContext, useEffect } from "react";
import authContext from "../context/AuthProvider";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import UserDashboard from "./UserDashboard";

export default function LoginForm({ setState, setUser }) {
  const { auth, setAuth } = useContext(authContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents the page from reloading on submit
    setError("");
    setLoading(true);

    try {
      console.log("Attempting login with:", { username, password });
      console.log(auth, setAuth);

      const response = await axios.post(
        "/log-in",
        { username, password },
        {
          withCredentials: true, // Required for session cookies
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("Login response:", response.data);

      if (response.data.success) {
        setAuth(true);
      } else {
        setError(response.data.message || "Login failed");
        setAuth(false);
      }
    } catch (err) {
      console.log("Login error:", err.response.data);

      if (err.response) {
        // Server responded with error status
        setError(err.response.data?.error || "Invalid credentials");
      } else if (err.request) {
        // Request was made but no response
        setError("No response from server. Is it running?");
      } else {
        // Other errors
        setError("Login failed. Please try again.");
      }
    } finally {
      setUsername("");
      setPassword("");
      setLoading(false);
    }
  };

  return auth ? (
    <UserDashboard />
  ) : (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="signup-link">
        Don't have an account? <a href="/sign-up">Sign up</a>
      </div>
    </div>
  );
}
