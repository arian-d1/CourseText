import SearchBar from "./SearchBar";
import CourseCodeDropdown from "./CourseCodeDropdown";

export default function Toolbar({ setCourseCode, setSearchTerm, searchTerm }) {
  return (
    <div className="w-full flex flex-col gap-4">
      <SearchBar
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        setCourseCode={setCourseCode}
      />
      <CourseCodeDropdown
        courseCodes={["", "CS101", "CS102", "CS103"]}
        onSelect={(code) => {
          setCourseCode(code);
          setSearchTerm("");
        }}
      />
    </div>
  );
}
