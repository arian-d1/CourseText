export default function Listing({ title, description, price, user_id }) {
  // User_id will be used to get the username
  return (
    <div className=" w-full aspect-square bg-amber-300">
      <p>{title}</p>
    </div>
  );
}
