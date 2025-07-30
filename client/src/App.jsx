import SignUp from "./components/SignupForm";
import Login from "./components/LoginForm";
import { Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import About from "./components/About";
import Home from "./components/Home";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/log-in" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
