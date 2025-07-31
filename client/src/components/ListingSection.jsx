import { useEffect } from "react";
import Toolbar from "./Toolbar";
import { useState } from "react";
import { getListings } from "../api/listings";
import Listing from "./Listing";

export default function ListingSection() {
  const [listings, setListings] = useState([]);
  const [currentSearch, setSearch] = useState("");
  const [currentCourseCode, setCourseCode] = useState("");

  useEffect(() => {
    async function getListingsFromApi() {
      try {
        let allListings = await getListings();
        setListings(allListings.data);
      } catch (err) {
        console.log(err);
      }
    }
    if (currentCourseCode !== "") {
      // Get course by code
    } else if (currentSearch !== "") {
      // Match by search
    } else {
      getListingsFromApi();
    }
  }, [currentSearch, currentCourseCode]); // When either of these change, re-fetch listings

  const listingElements = listings.map((listing) => {
    return (
      <Listing
        title={listing.title}
        description={listing.description}
        price={listing.price}
        user_id={listing.user_id}
      />
    );
  });

  console.log(listingElements);

  return (
    <div className="flex h-screen">
      <div className=" flex min-w-xs max-w-md bg-gray-200 p-4 shadow-md">
        <Toolbar />
      </div>
      <div className="grid grid-cols-2 auto-rows-fr gap-10 p-4 w-full">
        {listingElements}
      </div>
    </div>
  );
}
