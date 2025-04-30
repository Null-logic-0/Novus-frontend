import { useMutation } from "@tanstack/react-query";
import { createPost, queryClient } from "../../util/http";
import { useAuth } from "../../hooks/useAuth";
import { getSocket } from "../../lib/socket";

import ProfileAvatar from "../ProfileAvatar";
import PostForm from "./PostForm";
import ErrorBlock from "../UI/ErrorBlock";
import toast from "react-hot-toast";

function CreatePost({ onCancel }) {
  const { userData, token } = useAuth();

  const { mutate, isError, error, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: async (data) => {
      const socket = getSocket();
      if (socket) {
        const postWithUser = {
          ...data,
          user: {
            _id: userData?.data?.user?._id,
            fullName: userData?.data?.user?.fullName,
            profileImage: userData?.data?.user?.profileImage,
          },
        };
        socket.emit("new-post", postWithUser);
      }

      const userId = userData?.data?.user._id;
      await queryClient.invalidateQueries({ queryKey: ["me", userId] });
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      await queryClient.invalidateQueries({ queryKey: ["post"] });
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      onCancel();
      toast.success("Post created successfully!");
    },
  });

  function handleCreatePost(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    mutate({ data: formData, token });
  }

  return (
    <div className="flex items-start gap-4">
      <ProfileAvatar
        alt={`${userData?.data?.user?.fullName}-profile avatar`}
        img={userData?.data?.user?.profileImage}
      />
      <div className="flex flex-col gap-2 w-full">
        <p className="text-sm font-semibold text-white">
          {userData?.data?.user?.fullName}
        </p>

        <PostForm
          onCancel={onCancel}
          onSubmit={handleCreatePost}
          isPending={isPending}
        />
        {isError && (
          <>
            <ErrorBlock
              title="Failed to create post!"
              message={error.info?.message || "Invalid data provided"}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default CreatePost;
