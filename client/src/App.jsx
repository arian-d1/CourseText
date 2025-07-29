import SignUp from "./components/SignupPage";
import Login from "./components/LoginPage";
import { Routes, Route, Link } from "react-router-dom";
import UserDashboard from "./components/UserDashboard";
import { useState } from "react";

function App() {
  const [userAuthenticationState, setState] = useState(false);
  const [username, setUsername] = useState("");
    console.log(userAuthenticationState)
  return (
    <Routes>
      <Route path="/sign-up" element={<SignUp />} />
      <Route
        path="/log-in"
        element={
          userAuthenticationState ? (
            <UserDashboard username={username} />
          ) : (
            <Login setState={setState} setUser={setUsername} />
          )
        }
      />
    </Routes>
  );
}

export default App;
