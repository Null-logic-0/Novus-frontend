import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getSingleChat } from "../../util/http";

import ProfileAvatar from "../ProfileAvatar";
import { MdArrowBackIos } from "react-icons/md";
// import { useDispatch } from "react-redux";
// import { showChatSidebar } from "../../store/UI-slice";

function ChatHeader({ id }) {
  const { token } = useAuth();
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["chat", id],
    queryFn: () => getSingleChat({ token, id }),
  });

  function handleBack() {
    // dispatch(showChatSidebar());
    navigate("/direct");
  }

  return (
    <div className="flex gap-[8px] z-10 fixed w-full  items-center border-b-3 px-[8px] py-[16px] border-[#272A30] bg-[#17191C]">
      <button onClick={handleBack} className="xl:hidden">
        <MdArrowBackIos className="font-bold text-white text-2xl " />
      </button>
      <ProfileAvatar
        link={`/${data?.data?.chat?.otherUser?._id}`}
        img={data?.data?.chat?.otherUser?.profileImage}
        alt={data?.data?.chat?.otherUser?.fullName}
      />
      <p className="text-[16px] text-white font-bold">
        {data?.data?.chat?.otherUser?.fullName}
      </p>
    </div>
  );
}

export default ChatHeader;
