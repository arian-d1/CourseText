import { useEffect } from "react";
import Toolbar from "./Toolbar";
import { useState } from "react";
import {
  getAllListings,
  getListingsByCourseCode,
  getListingsBySearchTerm,
} from "../api/listings";
import Listing from "./Listing";

export default function ListingSection() {
  const [listings, setListings] = useState([]);
  const [currentSearch, setSearch] = useState("");
  const [currentCourseCode, setCourseCode] = useState("");

  useEffect(() => {
    async function getListingsFromApi() {
      try {
        if (currentCourseCode !== "") {
          // Get course by code
          const response = await getListingsByCourseCode(currentCourseCode);
          setListings(response.data);
        } else if (currentSearch !== "") {
          // Match by search
          const response = await getListingsBySearchTerm(currentSearch);
          setListings(response.data);
        } else {
          const response = await getAllListings();
          setListings(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    }

    getListingsFromApi();
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

  return (
    <div className="flex h-screen">
      <div className=" flex min-w-xs max-w-md bg-gray-200 p-4 shadow-md">
        <Toolbar setCourseCode={setCourseCode} setSearch={setSearch} />
      </div>
      <div className="grid grid-cols-2 auto-rows-fr gap-10 p-4 w-full">
        {listingElements}
      </div>
    </div>
  );
}
