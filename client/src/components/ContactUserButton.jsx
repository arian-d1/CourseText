export default function ContactUserButton({ setShowUser }) {
  return (
    <button
      onClick={() => setShowUser(true)}
      className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Contact Seller
    </button>
  );
}
