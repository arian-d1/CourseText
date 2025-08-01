import { useState, useContext, useEffect } from "react";
import { createListing } from "../api/listings";
import authContext from "../context/AuthProvider";
import { getIdByUser } from "../api/users";

export default function CreateListingPage({ setCreateState }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const { auth, setAuth } = useContext(authContext);
  const [user_id, setUser_id] = useState(null);

  useEffect(() => {
    setTitle("");
    setDescription("");
    setPrice("");
    setCode("");
    setError("");
    try {
      async function fetchUserId() {
        const id = await getIdByUser(auth.username);
        setUser_id(id);
      }
      fetchUserId();
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  }, [auth]);

  const regexCode = /[A-Z]{2,4}-[0-9]{3}/;
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !price || !code) {
      setError("All fields are required");
      return;
    }
    if (isNaN(price) || price <= 0) {
      setError("Price must be a positive number");
      return;
    }
    if (price.split(".").length > 1 && price.split(".")[1].length > 2) {
      setError("Price can have at most two decimal places");
      return;
    }
    if (price.split(".").length == 0) {
      setPrice((prev) => 0 + prev);
    }

    if (!regexCode.test(code)) {
      setError("Invalid course code format. Use format like 'MATH-100'");
      return;
    }

    try {
      const response = await createListing({
        title,
        description,
        price,
        code,
        user_id,
      });
      setCreateState(false);
      setError("");
      setTitle("");
      setDescription("");
      setPrice("");
      setCode("");
    } catch (error) {
      setError("Failed to create listing. Please try again.");
      return;
    }
  };
  return (
    <form onSubmit={handleSubmit} className="p-4 w-full">
      <h2 className="text-xl mb-4">Create Listing</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-2 p-2 border rounded w-full"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-2 p-2 border rounded w-full"
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="mb-2 p-2 border rounded w-full"
        required
      />
      <input
        type="text"
        placeholder="Course Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
        required
      />
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-500 p-2 mt-4 rounded-md">
          Create Listing
        </button>
        <button
          className="bg-amber-600 hover:bg-amber-700 rounded-md p-2 mt-4"
          onClick={(e) => {
            setCreateState(false);
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
