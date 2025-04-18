import Logo from "./Logo";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import MenuButton from "./UI/MenuButton";

function Header() {
  return (
    <header className="xl:hidden">
      <div className="w-full flex justify-center">
        <Logo />
      </div>
      <div className="flex items-center justify-end p-4 w-full fixed z-50 top-0 ">
        <MenuButton>
          <HiOutlineMenuAlt2 className="text-3xl max-xl:text-2xl" />
        </MenuButton>
      </div>
    </header>
  );
}

export default Header;
