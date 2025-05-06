import { useEffect } from "react";
import { getSocket } from "../lib/socket";
import { queryClient } from "../util/http";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router";

export function useChatSocket() {
  const { userData: user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleNewChat = (newChat) => {
      console.log("Received new-chat:", newChat);
      if (!newChat || !newChat.users) return;

      const isParticipant = newChat.users.some((u) => u._id === user._id);
      if (!isParticipant) return;

      queryClient.invalidateQueries({ queryKey: ["chats"] });
    };

    const handleNewMessage = (newMessage) => {
      console.log("Received new-message:", newMessage);
      if (!newMessage || !newMessage.chatId) return;

      const chatId = newMessage.chatId;

      queryClient.setQueryData(["messages", chatId], (old) => {
        if (!old) return { data: { messages: [newMessage] } };

        return {
          ...old,
          data: {
            ...old.data,
            messages: [...(old.data?.messages || []), newMessage],
          },
        };
      });

      queryClient.invalidateQueries({ queryKey: ["messages", chatId] });
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    };

    const handleDeleteChat = ({ chatId }) => {
      queryClient.setQueryData(["chats"], (old) => {
        if (!old?.data || !Array.isArray(old.data)) return old;

        return {
          ...old,
          data: old.data.filter((chat) => chat._id !== chatId),
        };
      });
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      queryClient.removeQueries({ queryKey: ["messages", chatId] });
      navigate("/direct");
    };

    socket.on("new-chat", handleNewChat);
    socket.on("new-message", handleNewMessage);
    socket.on("delete-chat", handleDeleteChat);

    return () => {
      socket.off("new-chat", handleNewChat);
      socket.off("new-message", handleNewMessage);
      socket.off("delete-chat", handleDeleteChat);
    };
  }, [user, navigate]);
}
