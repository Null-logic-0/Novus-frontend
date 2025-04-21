import { NavLink } from "react-router";

function SettingsNavItem({ children, link }) {
  return (
    <li>
      <NavLink
        to={link}
        className={({ isActive }) =>
          isActive
            ? "border-b-2 pb-1  border-white"
            : "border-b-2 pb-1 border-[#383838]"
        }
      >
        {children}
      </NavLink>
    </li>
  );
}

export default SettingsNavItem;
