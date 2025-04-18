import { NavLink } from "react-router";

function NavItem({ active, unActive, link }) {
  return (
    <li className="hover:bg-[#171717] p-2  flex justify-center items-center rounded-lg">
      <NavLink to={link}>
        {({ isActive }) => (isActive ? active : unActive)}
      </NavLink>
    </li>
  );
}

export default NavItem;
