import { useMutation } from "@tanstack/react-query";
import { queryClient, sendMessage } from "../util/http";
import toast from "react-hot-toast";

export function useSendMessage(userData) {
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

  return { mutate, isPending };
}
