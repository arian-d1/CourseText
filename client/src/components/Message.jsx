import { useEffect, useState } from "react";
import { getUserNameByID } from "../api/listings";

export default function Message({ sender_id, receiver_id, message }) {
  const [senderUsername, setSenderUsername] = useState(null);

  useEffect(() => {
    async function getUserName() {
      try {
        const response = await getUserNameByID(sender_id);
        setSenderUsername(response.data.username);
      } catch (error) {
        throw new Error("Failed to fetch username: " + error.message);
      }
    }
    getUserName();
  }, []);
  return (
    <div className="bg-white border border-gray-200 p-4 rounded-md shadow-sm">
      <p className="text-gray-700">{message}</p>
      <p className="text-xs text-gray-400 mt-2">From {senderUsername}</p>
    </div>
  );
}
