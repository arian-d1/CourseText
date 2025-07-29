import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import SignUp from "./components/SignupPage";

function App() {
  const [count, setCount] = useState(0);

  const fetchAPI = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api");
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SignUp/>
  );
}

export default App;
