import { Outlet } from "react-router";

import MainHeader from "../../components/MainHeader";
import NavMenu from "../../components/NavMenu/NavMenu";

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white overflow-y-auto">
      <MainHeader />
      <NavMenu />
      <main className="flex justify-center items-center pt-5 pb-8 max-md:pb-14 max-md:pt-18 px-6">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
