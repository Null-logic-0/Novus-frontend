import { Link } from "react-router";

import NovusLogoLight from "../src/assets/novusLight.png";
import NovusLogoDark from "../src/assets/novusDark.png";

function Logo({ className }) {
  return (
    <Link to="/" className={className}>
      <img src={NovusLogoLight} alt="logo" />
    </Link>
  );
}

export default Logo;
