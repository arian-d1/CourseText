import React, { useState, useContext, useEffect, use } from "react";
import authContext from "../context/AuthProvider";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import UserDashboard from "./UserDashboard";

export default function LoginForm() {
  const TIMEOUT = 3;
  const [cooldown, setCooldown] = useState(false);
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
      // Set pause
      if (cooldown) {
        setError(`Please wait ${TIMEOUT} more seconds`);
        return;
      } else {
        setCooldown(true);
      }
      setTimeout(() => {
        setCooldown(false);
        setError("");
      }, TIMEOUT * 1000);

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
      console.log(response);

      if (response.data.success == true) {
        setAuth({ state: true, username: username });
      } else {
        setError(response.data.message || "Login failed");
        setAuth({ state: false, username: null });
      }
    } catch (err) {
      if (err.status == 400) {
        setError(err.response.data.errors[0].msg || "Invalid input");
      } else if (err.status == 500) {
        setError(err.response.data.error || "Server error");
      } else if (err.status == 401) {
        setError(err.response.data.error || "Invalid credentials");
      } else {
        setError(err || "Invalid credentials");
      }
      setAuth({ state: false, username: null });
    } finally {
      setUsername("");
      setPassword("");
      setLoading(false);
    }
  };

  return auth.state ? (
    <UserDashboard />
  ) : (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img></img>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Log in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {error && (
          <div className="text-sm/6 font-medium text-red-500">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Username:
            </label>
            <div className="mt-2">
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password:
              </label>
              {/* <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div> */}
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Don't have an account?{" "}
          <a
            href="/sign-up"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
