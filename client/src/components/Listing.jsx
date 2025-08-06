import { useEffect, useState } from "react";
import { getUserNameByID } from "../api/listings";

export default function Listing({
  id,
  title,
  description,
  price,
  code,
  created_at,
  user_id,
  canDelete = false,
  handleDelete = () => {}, // Default to no-op if not provided
}) {
  // User_id will be used to get the username

  const [username, setUsername] = useState("Unknown");

  useEffect(() => {
    async function getUserName() {
      try {
        const response = await getUserNameByID(user_id);
        setUsername(response.data.username);
      } catch (error) {
        throw new Error("Failed to fetch username: " + error.message);
      }
    }
    getUserName();
  }, [user_id]);

  return (
  <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition p-4 flex flex-col justify-between space-y-4">
    
    <div className="flex justify-between items-start">
      <h2 className="text-xl font-semibold text-gray-800 truncate">{title}</h2>
      {canDelete && (
        <button
          onClick={() => handleDelete(id)}
          className="ml-4 px-3 py-1 text-xs font-medium rounded bg-red-500 text-white hover:bg-red-600 shrink-0"
        >
          Delete
        </button>
      )}
    </div>
  
    <div className="space-y-1">
      <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
      <p className="text-xs font-medium text-blue-600">{code}</p>
    </div>

    <div className="flex justify-between items-end pt-2 border-t border-gray-100">
      <div>
        <p className="text-md font-bold text-green-600">${price}</p>
        <p className="text-xs text-gray-500">By {username}</p>
      </div>
      <p className="text-xs text-gray-400">
        {new Date(created_at).toLocaleDateString()}
      </p>
    </div>
  </div>
);
}