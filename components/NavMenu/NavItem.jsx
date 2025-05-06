import { NavLink, useLocation } from "react-router";
import { twMerge } from "tailwind-merge";

function NavItem({
  active,
  unActive,
  link,
  className,
  additionalActiveLinks = [],
}) {
  const location = useLocation();
  const isAnyActive = [link, ...additionalActiveLinks].includes(
    location.pathname
  );

  return (
    <li
      className={twMerge(
        "hover:bg-[#171717] p-2 text-2xl max-md:text-xl flex justify-center items-center rounded-lg",
        className
      )}
    >
      <NavLink to={link}>{() => (isAnyActive ? active : unActive)}</NavLink>
    </li>
  );
}

export default NavItem;
