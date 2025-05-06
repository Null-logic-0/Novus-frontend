import { useParams } from "react-router";
import { useMessages } from "../../hooks/useMessages";
import { useDecryption } from "../../hooks/useDecryption";

import ChatHeader from "../../components/Chat/ChatHeader";
import SendMessage from "../../components/Chat/SendMessage";
import MessageItem from "../../components/Chat/MessageItem";

function Inbox() {
  const { id } = useParams();
  const { data, userData } = useMessages(id);
  const { decryptedMessages } = useDecryption(data);

  return (
    <div className=" w-full bg-[#080707] relative flex flex-col  ">
      <ChatHeader id={id} />

      <div className="h-screen overflow-y-scroll scrollbar-hide">
        {decryptedMessages.map((msg) => (
          <MessageItem
            key={msg._id}
            isSender={msg.sender._id === userData?.data?.user._id}
            messages={[
              {
                ...msg,
                content: msg.decryptedContent,
              },
            ]}
          />
        ))}
      </div>
      <SendMessage chatId={id} userData={userData} />
    </div>
  );
}

export default Inbox;
