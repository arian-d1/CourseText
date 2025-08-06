import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

export default function ContactUserButton({ setShowUser }) {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate(); 

  return (
    <button
      onClick={() => {if (auth.state) {
        setShowUser(true);
      } else {
        navigate("/log-in");
      }}}
      className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Contact Seller
    </button>
  );
}
