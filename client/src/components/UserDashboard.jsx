import { logOut } from "../api/checkAuth";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import authContext from "../context/AuthProvider";

export default function UserDashboard({ username, id }) {
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(authContext);


  return (
    <div className="flex h-screen">
      <div className=" flex flex-col min-w-3xs bg-gray-200 p-4 shadow-md ">
        <p>Welcome, {username}</p>

        <button 
        className="bg-amber-600 hover:bg-amber-700" 
        onClick={(e) => {logOut(); setAuth({ state: false, username: null, id: null });}}>Log Out</button>
      </div>
    </div>
  );
}
