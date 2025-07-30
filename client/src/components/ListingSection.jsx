import Toolbar from "./Toolbar";

export default function ListingSection() {
  return (
    <div className="">
      <div className="flex flex-1 overflow-hidden">
        <Toolbar />
      </div>
      <div className="flex-1 overflow-y-auto p-4"></div>
    </div>
  );
}
