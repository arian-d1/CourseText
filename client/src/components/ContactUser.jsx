import { useState } from "react";
import AuthContext from "../context/AuthProvider";
import { useContext } from "react";
import { createMessage } from "../api/message";
import { getIdByUser } from "../api/users";
import { useEffect } from "react";

export default function ContactUser({
  receiver_id,
  receiver_username,
  onClose,
}) {
  const [message, setMessage] = useState("");
  const { auth, setAuth } = useContext(AuthContext);
  const [sender_id, setSenderId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSenderId() {
      try {
        const id = await getIdByUser(auth.username);
        setSenderId(id);
      } catch (error) {
        console.error("Error fetching sender ID:", error);
      }
    }
    fetchSenderId();
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createMessage(sender_id, receiver_id, message);
      setError("");
      setMessage("");
      onClose("");
    } catch (err) {
      if (err.status == 400) {
        setError(err.response.data.errors[0].msg || "Invalid input");
        console.log(error);
      } else if (err.status == 500) {
        setError(err.response.data.error || "Server error");
      } else {
        setError(err || "Invalid message");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 bg-opacity-40">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4">
          Contact <span className="text-blue-600">{receiver_username}</span>
        </h2>

        {error && (
          <div className="text-sm/6 font-medium text-red-500">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            required
            className="w-full h-32 p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
