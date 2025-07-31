import { useEffect } from "react";
import Toolbar from "./Toolbar";
import { useState } from "react";
import { getListings } from "../api/listings";
import Listing from "./Listing";

export default function ListingSection() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function getListingsFromApi() {
      try {
        let allListings = await getListings();
        setListings(allListings.data);
      } catch (err) {
        console.log(err);
      }
    }
    getListingsFromApi();
  }, []);

  const listingElements = listings.map((listing) => {
    return <Listing

      title={listing.title}
      description={listing.description}
      price={listing.price}
      user_id={listing.user_id}
    />;
  });
  console.log(listingElements)

  return (
    <div className="">
      <div className="flex flex-1 overflow-hidden">
        <Toolbar />
      </div>
      <div className="flex-1 overflow-y-auto p-4">{listingElements}</div>
    </div>
  );
}
