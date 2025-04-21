import Logo from "./Logo";
import DropdownMenu from "./NavMenu/DropdownMenu";

function MainHeader() {
  return (
    <header className="xl:hidden bg-[#0f0f0f]  w-full fixed z-50 top-0 md:hidden">
      <div className="w-full flex justify-center">
        <Logo />
      </div>
      <div className="flex items-center justify-end p-4 w-full ">
        <DropdownMenu className="absolute right-10  max-md:bg-[#171717] max-md:rounded-2xl" />
      </div>
    </header>
  );
}

export default MainHeader;
