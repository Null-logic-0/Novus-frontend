import { Link } from "react-router";
import Logout from "./Authorization/Logout";
import Logo from "./Logo";
import DropdownMenu from "./NavMenu/DropdownMenu";
import NavItem from "./NavMenu/NavItem";

import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { RiMessengerFill, RiMessengerLine } from "react-icons/ri";

function MainHeader() {
  return (
    <header className="xl:hidden bg-[#0f0f0f]  w-full fixed z-50 top-0 md:hidden">
      <div className="w-full flex justify-center">
        <Logo />
      </div>
      <div className="flex items-center justify-between p-4 w-full ">
        <DropdownMenu
          modalId="dropdown-2"
          className="absolute left-5  max-md:bg-[#171717] max-md:rounded-2xl"
          icon={<HiOutlineMenuAlt2 />}
        >
          <li>
            <Link to="/settings/blocked-profiles">Settings</Link>
          </li>
          <li>
            <Logout />
          </li>
        </DropdownMenu>
        <ul>
          <NavItem
            link="/direct"
            active={<RiMessengerFill className="text-2xl font-bold" />}
            unActive={<RiMessengerLine className="text-2xl font-bold" />}
          />
        </ul>
      </div>
    </header>
  );
}

export default MainHeader;
