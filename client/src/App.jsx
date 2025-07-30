import SignUp from "./components/SignupForm";
import Login from "./components/LoginForm";
import { Routes, Route, Link } from "react-router-dom";
import UserDashboard from "./components/UserDashboard";
import { useState } from "react";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/log-in" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
