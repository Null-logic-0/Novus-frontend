import { useState } from "react";

export default function Dropdown({ options }) {
  const [selected, setSelected] = useState("");

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  return (
    <select
      id="dropdown"
      value={selected}
      onChange={handleChange}
      className="font-semibold focus:outline-none cursor-pointer"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
