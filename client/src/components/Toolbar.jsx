import SearchBar from "./SearchBar";
import CourseCodeDropdown from "./CourseCodeDropdown";

export default function Toolbar() {
  return (
    <div className="flex flex-col gap-4">
      <SearchBar />
      <CourseCodeDropdown
        courseCodes={["CS101", "CS102", "CS103"]}
        onSelect={(code) => console.log(`Selected course code: ${code}`)}
      />
    </div>
  );
}
