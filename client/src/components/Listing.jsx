import { useEffect } from "react";
import { getUserNameByID } from "../api/listings";

export default function Listing({ title, description, price, user_id }) {
  // User_id will be used to get the username

  useEffect(() => {
    async function getUserName() {
      try {
        const response = await getUserNameByID(user_id);
      } catch (error) {
        console.error(error);
      }
    }
    getUserName();
  }, [user_id]);

  return (
    <div className=" w-full aspect-square bg-amber-300">
      <p>{title}</p>
    </div>
  );
}
