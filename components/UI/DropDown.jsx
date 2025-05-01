import { useState } from "react";
import { useNavigate } from "react-router";

export default function Dropdown({ options }) {
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    navigate(`${value}`);
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
