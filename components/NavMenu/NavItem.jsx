import { NavLink, useLocation } from "react-router";

function NavItem({ active, unActive, link, additionalActiveLinks = [] }) {
  const location = useLocation();
  const isAnyActive = [link, ...additionalActiveLinks].includes(
    location.pathname
  );

  return (
    <li className="hover:bg-[#171717] p-2 text-2xl max-md:text-xl flex justify-center items-center rounded-lg">
      <NavLink to={link}>{() => (isAnyActive ? active : unActive)}</NavLink>
    </li>
  );
}

export default NavItem;
