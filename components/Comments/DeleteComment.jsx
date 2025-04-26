import { useMutation } from "@tanstack/react-query";
import Button from "../UI/Button";
import ErrorBlock from "../UI/ErrorBlock";
import { deleteComment, queryClient } from "../../util/http";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";

function DeleteComment({ onCancel, commentId }) {
  const { token } = useAuth();
  const { isError, error, isPending, mutate } = useMutation({
    mutationFn: ({ token }) => deleteComment({ token, id: commentId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
      onCancel();
      toast.success("Comment delete successfully!");
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
              onClick={() => mutate({ id: commentId, token })}
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

export default DeleteComment;
