import { useMutation } from "@tanstack/react-query";
import { deleteChat, queryClient } from "../../util/http";
import { useAuth } from "../../hooks/useAuth";

import Button from "../UI/Button";
import ErrorBlock from "../UI/ErrorBlock";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { getSocket } from "../../lib/socket";

function DeleteChat({ onCancel, chatId }) {
  const { token, userData } = useAuth();
  const navigate = useNavigate();
  const { isError, error, isPending, mutate } = useMutation({
    mutationFn: ({ token }) => deleteChat({ token, id: chatId }),
    // onSuccess: async () => {
    //   await queryClient.invalidateQueries({
    //     queryKey: ["chats"],
    //   });
    //   await onCancel();
    //   await navigate("/direct");
    //   toast.success("Chat delete successfully!");
    // },

    onSuccess: async () => {
      const socket = getSocket();
      if (socket) {
        socket.emit("delete-chat", {
          chatId,
          users: userData.data.user._id, // or array of participants
        });
      }

      await queryClient.invalidateQueries({ queryKey: ["chats"] });
      await onCancel();
      await navigate("/direct");
      toast.success("Chat deleted successfully!");
    },
  });

  return (
    <div className="flex flex-col gap-2 items-center">
      <h2 className="text-white text-xl font-bold">Are you sure?</h2>
      <p className="text-white opacity-50 text-sm font-semibold text-center">
        This action is permanent and cannot be undone.
        <br /> Are you sure you want to continue?
      </p>
      <div className="flex gap-2 justify-center items-center w-full pt-4">
        {!isPending && (
          <>
            <Button
              type="button"
              className="border-2 border-[#333333] max-w-30 text-white bg-[#171717] p-2"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              className="bg-white max-w-30 p-2"
              onClick={() => mutate({ id: chatId, token })}
            >
              Delete
            </Button>
          </>
        )}
        {isPending && (
          <p className="opacity-50 font-semibold text-white">
            Please wait,Comment is deleting...
          </p>
        )}
      </div>
      {isError && (
        <>
          <ErrorBlock
            title="Failed to delete Comment!"
            message={error.info?.message || "Invalid action provided"}
          />
        </>
      )}
    </div>
  );
}

export default DeleteChat;
