import { useState } from "react";
import axios from "../api/axios";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log(`Attempting to create user: ${username}, ${password}`);
      const response = await axios.post(
        "/sign-up",
        { username, password },
        {
          withCredentials: true, // Required for session cookies
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("Login response:", response);
    } catch (err) {
      console.error("Login error:", err);
      if (err.status == 409) {
        setError(err.response.data.error || "Username already in use");
      } else {
        setError(err || "Invalid credentials");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
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
        Already have an account? <a href="/log-in">Log in</a>
      </div>
    </div>
  );
}
