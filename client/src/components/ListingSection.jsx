import Toolbar from "./Toolbar";
import { useState } from "react";

export default function ListingSection() {
  const [listings, setListings] = useState([]);

  return (
    <div className="">
      <div className="flex flex-1 overflow-hidden">
        <Toolbar />
      </div>
      <div className="flex-1 overflow-y-auto p-4"></div>
    </div>
  );
}
