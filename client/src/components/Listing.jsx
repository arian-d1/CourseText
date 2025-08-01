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
        console.error(error);
      }
    }
    getUserName();
  }, [user_id]);

  return (
    <div className="w-full aspect-[4/5] sm:aspect-[1] md:aspect-[3/5] lg:aspect-[4/5] bg-white shadow-lg rounded-xl p-4 flex flex-col justify-between hover:shadow-xl transition">
      <div>
        <div>
          <h2 className="text-lg font-semibold mb-1 truncate">{title}</h2>
          <p className="text-sm text-gray-600 line-clamp-3 mb-2">
            {description}
          </p>
          <p className="text-xs text-gray-500">{code}</p>
        </div>
        {canDelete ? (
          <button
            className="mt-2 px-3 py-1 text-xs rounded bg-red-500 text-white hover:bg-red-600"
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>
        ) : null}
      </div>

      <div className="flex justify-between items-end">
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
