import Logo from "./Logo";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import MenuButton from "./UI/MenuButton";

function MainHeader() {
  return (
    <header className="xl:hidden  bg-[#0f0f0f] w-full fixed z-50 top-0 md:hidden">
      <div className="w-full flex justify-center">
        <Logo />
      </div>
      <div className="flex items-center justify-end p-4 w-full  ">
        <MenuButton>
          <HiOutlineMenuAlt2 className="text-3xl max-xl:text-2xl" />
        </MenuButton>
      </div>
    </header>
  );
}

export default MainHeader;
