import { useState } from "react";
import { useSelector } from "react-redux";

import ChatChannelHeader from "./ChatChannelHeader";
import ChatUsersList from "./Users/ChatUsersList";
import ChannelUserList from "./Users/ChannelUserList";

function ChatSidebar() {
  const isUsersVisible = useSelector((state) => state.ui.showUsers);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className=" bg-[#17191C] lg:max-w-[360px] w-full h-screen overflow-scroll border-r-2 border-[#272A30]">
      <ChatChannelHeader setSearchTerm={setSearchTerm} />
      {isUsersVisible ? (
        <ChannelUserList searchTerm={searchTerm} />
      ) : (
        <ChatUsersList />
      )}
    </div>
  );
}

export default ChatSidebar;
