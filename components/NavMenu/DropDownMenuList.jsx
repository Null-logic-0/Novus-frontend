import { Link } from "react-router";
import Logout from "../Authorization/Logout";

function DropDownMenuList() {
  return (
    <ul className="flex flex-col gap-4 px-6 py-4">
      <li>
        <Link to="/settings/blocked-profiles">Settings</Link>
      </li>
      <li>
        <Logout />
      </li>
    </ul>
  );
}

export default DropDownMenuList;
