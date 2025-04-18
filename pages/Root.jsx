import { Outlet } from "react-router";
import NavMenu from "../components/NavMenu";
import Header from "../components/Header";

function RootLayout() {
  return (
    <div>
      <Header />
      <NavMenu />
      <main className="flex justify-center items-center h-screen pt-14 pb-2">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
