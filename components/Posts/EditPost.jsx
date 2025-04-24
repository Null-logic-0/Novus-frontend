import { useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { useAuth } from "../../hooks/useAuth";
import { getSinglePost, queryClient, updatePost } from "../../util/http";

import ProfileAvatar from "../ProfileAvatar";
import Button from "../UI/Button";
import MediaGallery from "./MediaGallery";
import ErrorBlock from "../UI/ErrorBlock";

function EditPost({ onCancel, postId }) {
  const { userData, token } = useAuth();
  const captionRef = useRef();

  const { data: postData, isPending: postIsLoading } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getSinglePost({ id: postId, token }),
    enabled: !!postId,
  });
  const { isError, error, isPending, mutate } = useMutation({
    mutationFn: ({ id, token, data }) => updatePost({ id, token, data }),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      await queryClient.invalidateQueries({ queryKey: ["post", postId] });
      onCancel();
    },
  });

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("caption", captionRef.current.value);
    mutate({ token, data: formData, id: postId });
  }

  if (postIsLoading) {
    return <p className="text-white text-center text-xl">Post is Loading...</p>;
  }

  console.log("caption", postData?.data?.post?.caption);

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
            name="caption"
            placeholder="What's new?"
            className="w-full resize-none outline-none text-white bg-transparent"
            defaultValue={postData?.data?.post?.caption ?? ""}
          />
          <MediaGallery media={postData?.data?.post?.media || []} />
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
                Please wait,Post is updating...
              </p>
            )}
          </div>
          {isError && (
            <>
              <ErrorBlock
                title="Failed to update post data!"
                message={error.info?.message || "Invalid data provided"}
              />
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default EditPost;
