import { Outlet } from "react-router";
import NavMenu from "../components/NavMenu";
import Header from "../components/Header";

function RootLayout() {
  return (
    <div>
      <Header />
      <NavMenu />
    </div>
  );
}

export default RootLayout;
