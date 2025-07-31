import { useState, useEffect } from "react";
import fs from "fs";
import path from "path";

export default function CourseCodeDropdown({ courseCodes, onSelect }) {
  const [selectedCode, setSelectedCode] = useState("");

  // TODO
  //   useEffect(() => {
  //     function readCourseCodes() {
  //         courseCodes = fs.readFileSync(path.join('..', 'api', 'courseCodes.txt'), 'utf8')
  //         .split('\n')
  //         .filter(code => code.trim() !== '');
  //     }

  //     readCourseCodes();
  //     }, [])

  const handleSelect = (e) => {
    const code = e.target.value;
    setSelectedCode(code);
    onSelect(code);
  };

  return (
    <select
      value={selectedCode}
      onChange={handleSelect}
      className="w-full p-2 border border-gray-300 rounded-md"
    >
      <option value="" disabled>
        Select a course code
      </option>
      {courseCodes.map((code) => (
        <option key={code} value={code}>
          {code}
        </option>
      ))}
    </select>
  );
}
