import NavMenuList from "./NavMenuList";
import Logo from "../Logo";
import DropdownMenu from "./DropdownMenu";

function NavMenu() {
  return (
    <nav className="flex flex-col  items-center bg-[#0f0f0f] xl:h-full md:h-full xl:max-w-[80px] fixed max-md:w-full p-3 xl:pb-8 z-10 xl:left-0 max-md:flex-row max-md:justify-center max-md:bottom-0">
      <Logo className="max-md:hidden ml-2" />
      <NavMenuList />
      <div className="max-md:hidden">
        <DropdownMenu className="absolute bottom-18 left-5" />
      </div>
    </nav>
  );
}

export default NavMenu;
