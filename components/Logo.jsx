import { Link } from "react-router";

import NovusLogoLight from "../src/assets/novusLight.png";
import NovusLogoDark from "../src/assets/novusDark.png";
import { twMerge } from "tailwind-merge";

function Logo({ className }) {
  return (
    <Link
      to="/"
      className={twMerge("absolute w-40 h-40 top-[-25px]", className)}
    >
      <img src={NovusLogoLight} alt="logo" />
    </Link>
  );
}

export default Logo;
