import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { hideUsers, showUsers } from "../../store/UI-slice";

import SearchInput from "../SearchInput";
import { MdArrowBackIos } from "react-icons/md";

function ChatChannelHeader({ setSearchTerm }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isUsersVisible = useSelector((state) => state.ui.showUsers);

  return (
    <div className="flex items-center  justify-center gap-2 border-b-3 px-[8px] py-[11px] border-[#272A30]">
      <button
        onClick={() => {
          isUsersVisible ? dispatch(hideUsers()) : navigate("/");
        }}
        className="cursor-pointer"
      >
        <MdArrowBackIos className="font-bold text-white text-2xl " />
      </button>
      <SearchInput
        onChange={(e) => setSearchTerm?.(e.target.value)}
        readOnly={!isUsersVisible}
        onClick={() => {
          if (!isUsersVisible) dispatch(showUsers());
        }}
      />
    </div>
  );
}

export default ChatChannelHeader;
