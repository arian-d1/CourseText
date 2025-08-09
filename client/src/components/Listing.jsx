import { useEffect, useState, useContext } from "react";
import { getUserNameByID } from "../api/listings";
import ContactUserButton from "./ContactUserButton";
import ContactUser from "./ContactUser";
import AuthContext from "../context/AuthProvider";

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
  const [showUser, setShowUser] = useState(false);
  const { auth } = useContext(AuthContext);

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
    <div className="min-w-[190px] w-full bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition p-4 flex flex-col justify-between space-y-4">
      <div className="flex justify-between items-start">
        <div className="flex-1 pr-4">
          <h2 className="text-xl font-semibold text-gray-800 truncate">
            {title}
          </h2>
          <p className="text-sm text-gray-600 mt-1 line-clamp-3">
            {description}
          </p>
          <p className="text-xs font-medium text-blue-600 mt-1">{code}</p>
        </div>
        {canDelete && (
          <button
            onClick={() => handleDelete(id)}
            className="px-3 py-1 text-xs font-medium rounded bg-red-500 text-white hover:bg-red-600 shrink-0"
          >
            Delete
          </button>
        )}
      </div>

      <div className="flex justify-between items-end border-t border-gray-100 pt-2">
        <div>
          <p className="text-md font-bold text-green-600">${price}</p>
          {!canDelete && (
            <div className="pt-1 text-xs text-gray-500">
              <ContactUserButton setShowUser={setShowUser} />
            </div>
          )}
        </div>
        <p className="text-xs text-gray-400">
          {new Date(created_at).toLocaleDateString()}
        </p>
      </div>

      {showUser && (
        <ContactUser
          onClose={() => setShowUser(false)}
          receiver_id={user_id}
          receiver_username={username}
        />
      )}
    </div>
  );
}
