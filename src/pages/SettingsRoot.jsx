import { Outlet } from "react-router";
import MainContainer from "../../components/MainContainer";
import SettingsNavItem from "../../components/SettingsNavMenu/SettingsNavItem";

function SettingsRoot() {
  return (
    <MainContainer className="p-6">
      <ul className="flex justify-center items-center gap-2  p-6">
        <SettingsNavItem link="/settings/blocked-profiles">
          Blocked Profiles
        </SettingsNavItem>

        <SettingsNavItem link="/settings/account">Account</SettingsNavItem>
      </ul>
      <Outlet />
    </MainContainer>
  );
}

export default SettingsRoot;
