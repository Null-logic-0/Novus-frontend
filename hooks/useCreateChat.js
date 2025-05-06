import { useMutation } from "@tanstack/react-query";
import { createChat, queryClient } from "../util/http";
import { getSocket } from "../lib/socket";
import toast from "react-hot-toast";

export function useCreateChat(options = {}) {
  const { mutate } = useMutation({
    mutationFn: createChat,
    onSuccess: (data, variables, context) => {
      const socket = getSocket();

      if (socket) {
        socket.emit("new-chat", data?.data?.chat);
      }
      queryClient.invalidateQueries({ queryKey: ["chats"] });

      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: () => {
      toast.error("Failed to create chat!");
    },
  });

  return { mutate };
}
