import ProfileAvatar from "../ProfileAvatar";
import { useAuth } from "../../hooks/useAuth";
import PostForm from "./PostForm";
import { useMutation } from "@tanstack/react-query";
import { createPost, queryClient } from "../../util/http";
import ErrorBlock from "../UI/ErrorBlock";
import { useDispatch } from "react-redux";
import { closeModal } from "../../src/store/UI-slice";

function CreatePost({ onCancel }) {
  const { userData, token } = useAuth();
  const dispatch = useDispatch();

  const { mutate, isError, error, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      dispatch(closeModal("createPost"));
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
