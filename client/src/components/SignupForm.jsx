import { useState } from "react";
import axios from "../api/axios";

export default function SignupForm() {
  const TIMEOUT = 3;
  const [cooldown, setCooldown] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Set pause
      if (cooldown) {
        setError(`Please wait ${TIMEOUT} more seconds`);
        return;
      } else {
        setCooldown(true);
      }
      setTimeout(() => {
        setCooldown(false);
      }, TIMEOUT * 1000);

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
    <div className="bg-sky-200">
      <h2>Sign Up</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
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

        <div>
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

      <div>
        Already have an account? <a href="/log-in">Log in</a>
      </div>
    </div>
  );
}
