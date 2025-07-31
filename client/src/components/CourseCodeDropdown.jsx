import { useState } from "react";

export default function CourseCodeDropdown({ courseCodes, onSelect }) {
  const [selectedCode, setSelectedCode] = useState("");

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
