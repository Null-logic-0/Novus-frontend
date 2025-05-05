import { Outlet } from "react-router";
import ChatSidebar from "../../components/Chat/ChatSidebar";

function DirectRoot() {
  return (
    <div className="flex  w-full  h-full ">
      <ChatSidebar />
      <>
        <Outlet />
      </>
    </div>
  );
}

export default DirectRoot;
