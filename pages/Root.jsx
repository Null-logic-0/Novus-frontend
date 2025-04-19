import { Outlet } from "react-router";
import NavMenu from "../components/NavMenu";
import Header from "../components/Header";

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white overflow-y-auto">
      <Header />
      <NavMenu />
      <main className="flex justify-center items-center pt-14 pb-8 ">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
