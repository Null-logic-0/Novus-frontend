import { Link } from "react-router";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

import Logout from "./Authorization/Logout";
import Logo from "./Logo";
import DropdownMenu from "./NavMenu/DropdownMenu";

function MainHeader() {
  return (
    <header className="xl:hidden bg-[#0f0f0f]  w-full fixed z-50 top-0 md:hidden">
      <div className="w-full flex justify-center">
        <Logo />
      </div>
      <div className="flex items-center justify-end p-4 w-full ">
        <DropdownMenu
          modalId="dropdown"
          className="absolute right-10  max-md:bg-[#171717] max-md:rounded-2xl"
          icon={<HiOutlineMenuAlt2 />}
        >
          <li>
            <Link to="/settings/blocked-profiles">Settings</Link>
          </li>
          <li>
            <Logout />
          </li>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default MainHeader;
