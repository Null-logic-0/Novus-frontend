import { Link } from "react-router";
import ProfileAvatar from "../../ProfileAvatar";
import ChatDropdownMenu from "../ChatDropdownMenu";

function UserListItem({ isChat, fullName, img, onClick, chatId, link }) {
  return (
    <li
      onClick={isChat ? undefined : onClick}
      className="flex justify-between items-center cursor-pointer px-[8px] py-[11px]  hover:bg-[#272A30]"
    >
      <Link to={link} className="w-full">
        <div className="flex items-center gap-2 w-full">
          <ProfileAvatar img={img} alt={fullName} />
          <p className="text-white font-semibold">{fullName}</p>
        </div>
      </Link>
      {isChat && <ChatDropdownMenu chatId={chatId} />}
    </li>
  );
}

export default UserListItem;
