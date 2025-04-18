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
import MenuButton from "./UI/MenuButton";

function NavMenu() {
  return (
    <nav className="flex flex-col  items-center xl:h-full xl:max-w-[80px] fixed w-full max-xl:p-3 xl:pb-8 z-10 xl:left-0 max-xl:flex-row max-xl:justify-center max-xl:bottom-0">
      <Logo className="max-xl:hidden " />
      <ul className="flex flex-col items-center h-full justify-center xl:gap-12 max-xl:flex-row max-xl:justify-between  max-xl:w-full">
        <NavItem
          link="/"
          active={<AiFillHome />}
          unActive={<AiOutlineHome />}
        />
        <NavItem
          link="search"
          active={<RiSearch2Fill />}
          unActive={<RiSearch2Line />}
        />
        <MenuButton>
          <FaPlus />
        </MenuButton>
        <NavItem
          link="activity"
          active={<GoHeartFill />}
          unActive={<GoHeart />}
        />
        <NavItem
          link="user"
          active={<RiUser3Fill />}
          unActive={<RiUser3Line />}
        />
      </ul>
      <MenuButton className="max-xl:hidden">
        <HiOutlineMenuAlt2 />
      </MenuButton>
    </nav>
  );
}

export default NavMenu;
