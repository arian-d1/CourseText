import SearchBar from "./SearchBar";
import CourseCodeDropdown from "./CourseCodeDropdown";

export default function Toolbar({ setCourseCode, setSearch }) {
  return (
    <div className="flex flex-col gap-4">
      <SearchBar />
      <CourseCodeDropdown
        courseCodes={["", "CS101", "CS102", "CS103"]}
        onSelect={(code) => {
          setCourseCode(code);
          setSearch("");
        }}
      />
    </div>
  );
}
