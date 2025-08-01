import SearchBar from "./SearchBar";
import { useState } from "react";

export default function Toolbar({
  setCourseCode,
  setSearchTerm,
  searchTerm,
  error,
  setError,
}) {
    const [searchOption, setSearchOption] = useState("title");

    const handleSelect = (e) => {
        setSearchOption(e.target.value);
    }

  return (
    <div className="w-full flex flex-col gap-4 ">
      <SearchBar
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        setCourseCode={setCourseCode}
        error={error}
        setError={setError}
        searchOption={searchOption}
      />
      <div className="flex gap-4 w-full">
        <form className="flex justify-between">
            <div>
                <input type="radio" name="searchOption" defaultChecked value="title" onClick={handleSelect}/>
                <label>Search by title</label>
            </div>
            <div>
                <input type="radio" name="searchOption" value="code" onClick={handleSelect}/>
                <label>Search by course code</label>
            </div>
        </form>
      </div>
    </div>
  );
}
