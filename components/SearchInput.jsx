import Input from "./UI/Input";
import { IoMdSearch } from "react-icons/io";

function SearchInput({ onSubmit, value, onChange }) {
  return (
    <form onSubmit={onSubmit} className="flex items-center relative w-full ">
      <IoMdSearch className="absolute right-5 text-2xl text-[#4d4d4d]" />

      <Input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={onChange}
        className="rounded-2xl border border-[#4d4d4d] bg-[#0a0a0a] px-4 py-3"
      />
    </form>
  );
}

export default SearchInput;
