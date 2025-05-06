import { useState } from "react";
import { useSelector } from "react-redux";

import ChatChannelHeader from "./ChatChannelHeader";
import ChatUsersList from "./Users/ChatUsersList";
import ChannelUserList from "./Users/ChannelUserList";

function ChatSidebar() {
  const isUsersVisible = useSelector((state) => state.ui.showUsers);
  const [searchTerm, setSearchTerm] = useState("");

  const SidebarContent = (
    <>
      <ChatChannelHeader setSearchTerm={setSearchTerm} />
      {isUsersVisible ? (
        <ChannelUserList searchTerm={searchTerm} />
      ) : (
        <ChatUsersList />
      )}
    </>
  );

  return (
    <div className="bg-[#17191C] md:max-w-[360px] w-full  h-screen overflow-scroll border-r-2 border-[#272A30]">
      {SidebarContent}
    </div>
  );
}

export default ChatSidebar;
