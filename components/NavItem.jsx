import { NavLink } from "react-router";

function NavItem({ active, unActive, link }) {
  return (
    <li className="hover:bg-[#171717] p-2 text-3xl max-xl:text-2xl flex justify-center items-center rounded-lg">
      <NavLink to={link}>
        {({ isActive }) => (isActive ? active : unActive)}
      </NavLink>
    </li>
  );
}

export default NavItem;
