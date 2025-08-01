import { logOut } from "../api/checkAuth";
import { useContext, useEffect, useState } from "react";
import authContext from "../context/AuthProvider";
import { getListingsById, deleteListing } from "../api/listings";
import { getIdByUser } from "../api/users";
import Listing from "./Listing";
import CreateListingPage from "./CreateListingPage";

export default function UserDashboard() {
  const { auth, setAuth } = useContext(authContext);
  const [listings, setListings] = useState([]);
  const [createState, setCreateState] = useState(false);

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

  async function handleDelete(id) {
    try {
      await deleteListing(id);
      setListings((prevListings) =>
        prevListings.filter((listing) => listing.id !== id),
      );
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  }
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
        handleDelete={handleDelete}
        key={listing.id + listing.created_at}
      />
    );
  });

  return (
    <div className="flex h-screen">
      <div className=" flex flex-col min-w-3xs bg-gray-200 p-4 shadow-md ">
        <p>Welcome, {auth.username}</p>

        <button
          className="bg-amber-600 hover:bg-amber-700 rounded-md p-2 mt-4"
          onClick={(e) => {
            logOut();
            setAuth({ state: false, username: null });
          }}
        >
          Log Out
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-500/75 rounded-md p-2 mt-4"
          onClick={(e) => {
            setCreateState(true);
          }}
        >
          Create Listing
        </button>
      </div>
      {createState ? (
        <CreateListingPage setCreateState={setCreateState} />
      ) : (
        <div className="flex flex-col w-full">
          <div className="w-full border-b border-gray-300 p-4 bg-white shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800">
              Your Listings
            </h2>
            <p className="text-sm text-gray-500">
              Manage and update your active listings below.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 overflow-auto">
            {listingElements}
          </div>
        </div>
      )}
    </div>
  );
}
