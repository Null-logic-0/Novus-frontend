import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import { queryClient, sendMessage } from "../../util/http";
import { encryptMessage } from "../../util/encryption/encryptMessage";

import toast from "react-hot-toast";
import SendMessageForm from "./SendMessageForm";

function SendMessage({ chatId, userData }) {
  const { token } = useAuth();
  const [caption, setCaption] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const fileInputRef = useRef(null);

  const { mutate, isPending } = useMutation({
    mutationFn: sendMessage,

    onMutate: async ({ data, id }) => {
      const content = data.get("content");

      const fakeMessage = {
        _id: Date.now().toString(),
        content,
        sender: { _id: userData.data.user._id },
        createdAt: new Date().toISOString(),
        isOptimistic: true,
      };

      await queryClient.cancelQueries({ queryKey: ["messages", id] });

      const previousData = queryClient.getQueryData(["messages", id]);

      queryClient.setQueryData(["messages", id], (old) => ({
        ...old,
        data: {
          ...old?.data,
          messages: [...(old?.data?.messages || []), fakeMessage],
        },
      }));

      return { previousData };
    },

    onError: (err, variables, context) => {
      toast.error("Failed to send message!");
      if (context?.previousData) {
        queryClient.setQueryData(
          ["messages", variables.id],
          context.previousData
        );
      }
    },

    onSettled: (_, __, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["messages", id] });
    },
  });

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
