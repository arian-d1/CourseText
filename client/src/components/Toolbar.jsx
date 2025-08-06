import SearchBar from "./SearchBar";
import { useState } from "react";

export default function Toolbar({
  setCourseCode,
  setSearchTerm,
  error,
  setError,
}) {
  const [searchOption, setSearchOption] = useState("title");

  const handleSelect = (e) => {
    setSearchOption(e.target.value);
    setSearchTerm("")
    setCourseCode("")
  };

  return (
    <div className="w-full flex flex-col gap-4 ">
      <SearchBar
        key={searchOption} // This will force reset on toggle
        setSearchTerm={setSearchTerm}
        setCourseCode={setCourseCode}
        error={error}
        setError={setError}
        searchOption={searchOption}
      />
      <form className="flex gap-6 px-2">
        <label className="inline-flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="searchOption"
            value="title"
            defaultChecked
            onClick={handleSelect}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
          />
          <span className="text-sm text-gray-700">Search by title</span>
        </label>

        <label className="inline-flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="searchOption"
            value="code"
            onClick={handleSelect}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
          />
          <span className="text-sm text-gray-700">Search by course code</span>
        </label>
      </form>
    </div>
  );
}
