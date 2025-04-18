import Logo from "./Logo";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

function Header() {
  return (
    <header className="xl:hidden">
      <div className="w-full flex justify-center">
        <Logo className=" absolute w-40 h-40 top-[-25px]  " />
      </div>
      <div className="flex items-center justify-end p-4 w-full fixed z-50 top-0 ">
        <button className="hover:bg-[#171717] p-2 cursor-pointer flex justify-center items-center rounded-lg ">
          <HiOutlineMenuAlt2 className="text-3xl max-xl:text-2xl" />
        </button>
      </div>
    </header>
  );
}

export default Header;
