import SearchBar from "./SearchBar";

export default function Toolbar() {
  return (
    <div className="min-w-2xs max-w-sm h-screen flex flex-col fixed bg-gray-200 p-4 shadow-md">
      <SearchBar />
    </div>
  );
}
