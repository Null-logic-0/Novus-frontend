import { useParams } from "react-router";
import ChatInbox from "../../components/Chat/ChatInbox";

function Inbox() {
  const { id } = useParams();

  return (
    <div className=" w-full bg-[#080707] relative max-md:absolute max-md:z-50 flex flex-col">
      <ChatInbox id={id} />
    </div>
  );
}

export default Inbox;
