import { NavLink, Outlet } from "react-router";
import MainHeader from "../../components/MainHeader";
import NavMenu from "../../components/NavMenu/NavMenu";
import MainContainer from "../../components/MainContainer";
import SettingsNavItem from "../../components/SettingsNavMenu/SettingsNavItem";
import PagesHeader from "../../components/PagesHeader";

function SettingsRoot() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white overflow-y-auto">
      <MainHeader />
      <NavMenu />
      <main className="flex justify-center items-center pt-16 pb-8 max-md:pb-14">
        <PagesHeader title="Settings" />
        <MainContainer className="p-6">
          <ul className="flex justify-center items-center gap-2  p-6">
            <SettingsNavItem link="/settings/blocked-profiles">
              Blocked Profiles
            </SettingsNavItem>

            <SettingsNavItem link="/settings/account">Account</SettingsNavItem>
          </ul>
          <Outlet />
        </MainContainer>
      </main>
    </div>
  );
}

export default SettingsRoot;
