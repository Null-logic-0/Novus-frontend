import { ImSpinner2 } from "react-icons/im";
import Button from "./UI/Button";
import { useMutation } from "@tanstack/react-query";
import { followUnfollowUser, queryClient } from "../util/http";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";

function FollowUnfollowButton({ isFullButton, isBigButton, userId }) {
  const { token, userData: loggedInUser } = useAuth();
  const [isFollowingState, setIsFollowingState] = useState(
    loggedInUser?.data?.user?.following.some(
      (followedUser) => followedUser._id === userId
    )
  );

  const isCurrentUser = loggedInUser?.data?.user._id === userId;

  const { mutate, isPending } = useMutation({
    mutationFn: () => followUnfollowUser({ token, id: userId }),

    onMutate: async () => {
      setIsFollowingState((prev) => !prev);

      toast.loading(isFollowingState ? "Unfollowing..." : "Following...", {
        id: "followAction",
      });

      const previousUser = queryClient.getQueryData([
        "user",
        loggedInUser?.data?.user._id,
      ]);

      queryClient.setQueryData(
        ["user", loggedInUser?.data?.user._id],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: {
              ...oldData.data,
              user: {
                ...oldData.data.user,
                following: isFollowingState
                  ? oldData.data.user.following.filter((id) => id !== userId)
                  : [...oldData.data.user.following, userId],
              },
            },
          };
        }
      );

      return { previousUser };
    },

    onError: (error, variables, context) => {
      setIsFollowingState((prev) => !prev);

      if (context?.previousUser) {
        queryClient.setQueryData(
          ["user", loggedInUser?.data?.user._id],
          context.previousUser
        );
      }

      toast.error(error?.info?.message || "Failed to follow/unfollow.", {
        id: "followAction",
      });
    },

    onSuccess: () => {
      toast.success(isFollowingState ? "Unfollowed!" : "Followed!", {
        id: "followAction",
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["me", loggedInUser?.data?.user._id],
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
    },
  });

  function handleFollow() {
    mutate();
  }

  if (isCurrentUser) {
    return null;
  }

  return (
    <>
      {isFullButton && (
        <Button
          onClick={handleFollow}
          disabled={isPending}
          className={`flex items-center justify-center gap-2 ${
            isFollowingState
              ? "border-[#383838] text-white"
              : "bg-white text-black"
          } ${
            isBigButton ? "w-full text-lg" : "w-30"
          } rounded-xl border hover:border-[#383838] hover:bg-transparent hover:text-white p-2`}
        >
          {isPending ? (
            <>
              <ImSpinner2 className="animate-spin" />
              Loading...
            </>
          ) : isFollowingState ? (
            "Unfollow"
          ) : (
            "Follow"
          )}
        </Button>
      )}
    </>
  );
}

export default FollowUnfollowButton;
