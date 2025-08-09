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
  const [searchTerm, setSearchTerm] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getListingsFromApi() {
      try {
        setLoading(true);

        if (courseCode !== "") {
          // Get course by code
          const response = await getListingsByCourseCode(courseCode);
          setListings(response.data);
        } else if (searchTerm !== "") {
          // Match by search
          const response = await getListingsBySearchTerm(searchTerm);
          setListings(response.data);
        } else {
          const response = await getAllListings();
          setListings(response.data);
        }
        setError("");
      } catch (err) {
        if ((err.status = 400)) {
          setError(err.response.data.errors[0].msg || "Invalid input");
        } else if ((err.status = 500)) {
          setError(err.response.data.error || "Server error");
        } else {
          setError("Search failed. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }

    getListingsFromApi();
  }, [searchTerm, courseCode]); // When either of these change, re-fetch listings

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
        canDelete={false}
        key={listing.id + listing.created_at}
      />
    );
  });

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-auto flex-shrink-0 bg-gray-200 p-5 shadow-md">
        <Toolbar
          setCourseCode={setCourseCode}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          error={error}
          setError={setError}
        />
      </div>
      <div className="flex flex-col w-full overflow-auto">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {loading ?  <p>Loading listings...</p> : listingElements} 
        </div>
      </div>
    </div>
  );
}
