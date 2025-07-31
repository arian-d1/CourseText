import { logOut } from "../api/checkAuth";
import { useContext, useEffect, useState } from "react";
import authContext from "../context/AuthProvider";
import { getListingsById } from "../api/listings";
import { getIdByUser } from "../api/users";
import Listing from "./Listing";

export default function UserDashboard() {
  const { auth, setAuth } = useContext(authContext);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function fetchListings() {
      try {
        const id = await getIdByUser(auth.username);
        const response = await getListingsById(id);
        setListings(response.data);
      } catch (error) {
        console.error("Error fetching user listings:", error);
      }
    }

    fetchListings();
  }, [auth]);

  const listingElements = listings.map((listing) => {
    return (
      <Listing
        id={listing.id}
        title={listing.title}
        description={listing.description}
        price={listing.price}
        code={listing.code}
        created_at={listing.created_at}
        user_id={listing.user_id}
        canDelete={true}
        listings={listings}
        key={listing.id + listing.created_at}
      />
    );
  });

  async function handleDelete(id) {
    try {
      // Assuming you have a delete API function
      await deleteListing(id);
      setListings((prevListings) =>
        prevListings.filter((listing) => listing.id !== id),
      );
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  }

  return (
    <div className="flex h-screen">
      <div className=" flex flex-col min-w-3xs bg-gray-200 p-4 shadow-md ">
        <p>Welcome, {auth.username}</p>

        <button
          className="bg-amber-600 hover:bg-amber-700"
          onClick={(e) => {
            logOut();
            setAuth({ state: false, username: null });
          }}
        >
          Log Out
        </button>
      </div>
      <div className="flex flex-col w-full">
        <div>
          <p>Your Listings</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 overflow-auto">
          {listingElements}
        </div>
      </div>
    </div>
  );
}
