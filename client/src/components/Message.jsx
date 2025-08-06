export default function Message({ sender_id, receiver_id, message }) {
  return (
    <div className="bg-white border border-gray-200 p-4 rounded-md shadow-sm">
      <p className="text-gray-700">{message}</p>
      <p className="text-xs text-gray-400 mt-2">From user ID: {sender_id}</p>
    </div>
  );
}
