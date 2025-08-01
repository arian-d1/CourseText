import { useState } from "react";

export default function CreateListingPage({ setCreateState }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Creating listing with:", {
      title,
      description,
      price,
      code,
    });
    setTitle("");
    setDescription("");
    setPrice("");
    setCode("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 w-full">
      <h2 className="text-xl mb-4">Create Listing</h2>
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
         onClick={(e) => {setCreateState(false);}}>
          Cancel
        </button>
      </div>
    </form>
  );
}
