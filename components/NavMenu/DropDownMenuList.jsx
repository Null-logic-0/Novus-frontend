import { Link } from "react-router";

function DropDownMenuList() {
  return (
    <ul className="flex flex-col gap-4 px-6 py-4">
      <li>
        <Link to="/settings/blocked-profiles">Settings</Link>
      </li>
      <li>
        <button className="text-red-500 font-bold cursor-pointer">
          Log Out
        </button>
      </li>
    </ul>
  );
}

export default DropDownMenuList;
