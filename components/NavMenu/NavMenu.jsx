import NavMenuList from "./NavMenuList";
import Logo from "../Logo";
import DropdownMenu from "./DropdownMenu";
import Logout from "../Authorization/Logout";

import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { Link } from "react-router";

function NavMenu() {
  return (
    <nav className="flex flex-col  items-center bg-[#0f0f0f] xl:h-full md:h-full xl:max-w-[80px] fixed max-md:w-full p-3 xl:pb-8 z-10 xl:left-0 max-md:flex-row max-md:justify-center max-md:bottom-0">
      <Logo className="max-md:hidden ml-2" />
      <NavMenuList />
      <div className="max-md:hidden max-md:relative">
        <DropdownMenu
          modalId="dropdown"
          className="absolute bottom-16 z-50  left-5"
          icon={<HiOutlineMenuAlt2 />}
        >
          <li>
            <Link to="settings/blocked-profiles">Settings</Link>
          </li>
          <li>
            <Logout />
          </li>
        </DropdownMenu>
      </div>
    </nav>
  );
}

export default NavMenu;
