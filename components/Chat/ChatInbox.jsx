import { useDecryption } from "../../hooks/useDecryption";
import { useMessages } from "../../hooks/useMessages";

import ChatHeader from "./ChatHeader";
import MessageItem from "./MessageItem";
import SendMessage from "./SendMessage";

function ChatInbox({ id }) {
  const { data, userData } = useMessages(id);
  const { decryptedMessages } = useDecryption(data);
  return (
    <>
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
    </>
  );
}

export default ChatInbox;
