import { useState, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import { encryptMessage } from "../../util/encryption/encryptMessage";

import toast from "react-hot-toast";
import SendMessageForm from "./SendMessageForm";
import { getSocket } from "../../lib/socket";
import { useSendMessage } from "../../hooks/useSendMessage";

function SendMessage({ chatId, userData }) {
  const { token } = useAuth();
  const [caption, setCaption] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const fileInputRef = useRef(null);

  const { mutate, isPending } = useSendMessage(userData);
  async function handleSubmit(event) {
    event.preventDefault();

    if (!caption.trim() && mediaFiles.length === 0) return;

    try {
      const encryptedContent = await encryptMessage(caption.trim());
      const formData = new FormData();
      formData.append("content", encryptedContent);

      mediaFiles.forEach(({ file }) => {
        if (file instanceof File) {
          formData.append("media", file);
        }
      });

      mutate({ token, data: formData, id: chatId });

      const socket = getSocket();
      if (socket) {
        socket.emit("new-message", {
          chatId,
          content: encryptedContent,
          media: mediaFiles.map(({ file }) => ({
            url: URL.createObjectURL(file),
            type: file.type.startsWith("video") ? "video" : "image",
          })),
          sender: { _id: userData.data.user._id },
          createdAt: new Date().toISOString(),
        });
      }

      setCaption("");
      setMediaFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = null;
    } catch (error) {
      toast.error(error.message || "Encryption failed!");
    }
  }

  return (
    <SendMessageForm
      isPending={isPending}
      setCaption={setCaption}
      setMediaFiles={setMediaFiles}
      mediaFiles={mediaFiles}
      handleSubmit={handleSubmit}
      caption={caption}
      fileInputRef={fileInputRef}
    />
  );
}

export default SendMessage;
