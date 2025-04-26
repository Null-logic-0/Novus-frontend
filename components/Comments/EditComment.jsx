import { useRef } from "react";
import { getSingleComment, queryClient, updateComment } from "../../util/http";
import { useAuth } from "../../hooks/useAuth";

import ProfileAvatar from "../ProfileAvatar";
import Button from "../UI/Button";
import ErrorBlock from "../UI/ErrorBlock";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

function EditComment({ onCancel, commentId }) {
  const { userData, token } = useAuth();
  const captionRef = useRef();
  console.log(commentId, "xd");

  const { data: commentData, isPending: commentIsLoading } = useQuery({
    queryKey: ["comment", commentId],
    queryFn: () => getSingleComment({ id: commentId, token }),
    enabled: !!commentId,
  });
  const { isError, error, isPending, mutate } = useMutation({
    mutationFn: ({ id, token, data }) => updateComment({ id, token, data }),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["comments"] });
      await queryClient.invalidateQueries({ queryKey: ["comment", commentId] });

      onCancel();
      toast.success("Comment Updated successfully!");
    },
  });

  function handleSubmit(event) {
    event.preventDefault();

    const data = {
      text: captionRef.current.value,
    };

    mutate({ token, data, id: commentId });
  }

  if (commentIsLoading) {
    return (
      <p className="text-white text-center text-lg font-semibold opacity-50">
        Comment is Loading...
      </p>
    );
  }
  return (
    <div className="flex items-start max-md:justify-center w-full  gap-2 ">
      <ProfileAvatar
        alt={`${userData?.data?.user?.fullName}`}
        img={userData?.data?.user?.profileImage}
      />

      <div className="flex flex-col p-[2px]">
        <p className="font-bold text-white text-[14px]">
          {userData?.data?.user?.fullName}
        </p>
        <form className="flex flex-col p-[2px] gap-2" onSubmit={handleSubmit}>
          <textarea
            ref={captionRef}
            name="text"
            className="w-full resize-none outline-none text-white bg-transparent"
            defaultValue={commentData?.data?.comment?.text ?? ""}
          />
          <div className="flex gap-2 justify-end items-center w-full pt-4">
            {!isPending && (
              <>
                <Button
                  type="button"
                  className="border-2 border-[#333333] max-w-30 text-white bg-[#171717] p-2"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
                <Button className="bg-white max-w-30 p-2">Update</Button>
              </>
            )}
            {isPending && (
              <p className="opacity-50 font-semibold text-white">
                Please wait,comment is updating...
              </p>
            )}
          </div>
          {isError && (
            <>
              <ErrorBlock
                title="Failed to update comment data!"
                message={error.info?.message || "Invalid data provided"}
              />
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default EditComment;
