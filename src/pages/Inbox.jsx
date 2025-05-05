import ChatHeader from "../../components/Chat/ChatHeader";
import SendMessage from "../../components/Chat/SendMessage";
import MessageItem from "../../components/Chat/MessageItem";

import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getChatMessages } from "../../util/http";
import { useAuth } from "../../hooks/useAuth";
import { decryptMessage } from "../../util/encryption/decryptMessage";
import { useEffect, useState } from "react";

function Inbox() {
  const { id } = useParams();
  const { token, userData } = useAuth();

  const { data } = useQuery({
    queryKey: ["messages", id],
    queryFn: () => getChatMessages({ token, id }),
  });

  const [decryptedMessages, setDecryptedMessages] = useState([]);

  useEffect(() => {
    async function decryptAll() {
      if (!data?.data?.messages) return;

      const decrypted = await Promise.all(
        data.data.messages.map(async (msg) => {
          try {
            const content = await decryptMessage(msg.content);
            return { ...msg, decryptedContent: content };
          } catch (err) {
            console.error("Failed to decrypt message", err);
            return { ...msg, decryptedContent: "[Decryption failed]" };
          }
        })
      );

      setDecryptedMessages(decrypted);
    }

    decryptAll();
  }, [data]);

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
