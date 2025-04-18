import { AiFillHome } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { RiSearch2Fill } from "react-icons/ri";
import { RiSearch2Line } from "react-icons/ri";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { RiUser3Fill } from "react-icons/ri";
import { RiUser3Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

import NavItem from "./NavItem";
import Logo from "./Logo";

function NavMenu() {
  return (
    <nav className="flex flex-col  items-center xl:h-full xl:max-w-[80px] fixed w-full max-xl:p-3 xl:pb-8 z-10 xl:left-0 max-xl:flex-row max-xl:justify-center max-xl:bottom-0">
      <Logo className="max-xl:hidden absolute w-40 h-40 top-[-25px]" />
      <ul className="flex flex-col items-center h-full justify-center xl:gap-12 max-xl:flex-row max-xl:justify-between  max-xl:w-full">
        <NavItem
          link="/"
          active={<AiFillHome className="text-3xl max-xl:text-2xl" />}
          unActive={<AiOutlineHome className="text-3xl max-xl:text-2xl" />}
        />
        <NavItem
          link="search"
          active={<RiSearch2Fill className="text-3xl max-xl:text-2xl" />}
          unActive={<RiSearch2Line className="text-3xl max-xl:text-2xl" />}
        />
        <button className="hover:bg-[#171717] p-2 cursor-pointer  flex justify-center items-center rounded-lg">
          <FaPlus className="text-3xl max-xl:text-2xl" />
        </button>
        <NavItem
          link="activity"
          active={<GoHeartFill className="text-3xl max-xl:text-2xl" />}
          unActive={<GoHeart className="text-3xl max-xl:text-2xl" />}
        />
        <NavItem
          link="user"
          active={<RiUser3Fill className="text-3xl max-xl:text-2xl" />}
          unActive={<RiUser3Line className="text-3xl max-xl:text-2xl" />}
        />
      </ul>
      <button className="hover:bg-[#171717] p-2 cursor-pointer flex justify-center items-center rounded-lg max-xl:hidden">
        <HiOutlineMenuAlt2 className="text-3xl max-xl:text-2xl" />
      </button>
    </nav>
  );
}

export default NavMenu;
