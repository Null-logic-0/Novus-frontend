import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import Button from "../UI/Button";
import ErrorBlock from "../UI/ErrorBlock";
import { deletePost, queryClient } from "../../util/http";

function DeletePost({ onCancel, postId }) {
  const { token } = useAuth();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ({ token }) => deletePost({ token, id: postId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      await queryClient.invalidateQueries({ queryKey: ["post", postId] });
      onCancel();
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
              onClick={() => mutate({ id: postId, token })}
            >
              Delete
            </Button>
          </>
        )}
        {isPending && (
          <p className="opacity-50 font-semibold text-white">
            Please wait,Post is deleting...
          </p>
        )}
      </div>
      {isError && (
        <>
          <ErrorBlock
            title="Failed to delete post!"
            message={error.info?.message || "Invalid action provided"}
          />
        </>
      )}
    </div>
  );
}

export default DeletePost;
