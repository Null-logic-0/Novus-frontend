import { Outlet } from "react-router";
import NavMenu from "../components/NavMenu";
import MainHeader from "../components/MainHeader";

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white overflow-y-auto">
      <MainHeader />
      <NavMenu />
      <main className="flex justify-center items-center pt-14 pb-8 ">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
