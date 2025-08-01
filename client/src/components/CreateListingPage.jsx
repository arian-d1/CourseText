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
      if (error.status == 400) {
        setError(error.response.data.errors[0].msg || "Invalid input");
      } else if (error.status == 500) {
        setError(error.response.data.error || "Server error");
      } else {
        setError("Failed to create listing. Please try again.");
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-4 h-fit"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Create a Listing</h2>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter title"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter description"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 25"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Code
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. CPSC 110"
            required
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={() => setCreateState(false)}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
        >
          Create Listing
        </button>
      </div>
    </form>
  );
}
