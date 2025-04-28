import { FaRegComment } from "react-icons/fa";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { postLike, queryClient } from "../../util/http";
import { useAuth } from "../../hooks/useAuth";

function PostActions({ initialLikes, postId, likes, link }) {
  const { token, userData } = useAuth();

  const isLikedByUser = likes?.some(
    (like) => like[0] === userData?.data?.user._id
  );

  const [isLiked, setIsLiked] = useState(isLikedByUser);
  const [likesCount, setLikes] = useState(initialLikes ?? 0);
  const [isPopping, setIsPopping] = useState(false);
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: () => postLike({ token, id: postId }),
    onMutate: async () => {
      const previousLiked = isLiked;
      const previousLikes = likesCount;

      const newLiked = !previousLiked;
      const newLikes = newLiked
        ? previousLikes + 1
        : Math.max(0, previousLikes - 1);

      setIsLiked(newLiked);
      setLikes(newLikes);

      return { previousLiked, previousLikes };
    },
    onSuccess: (data) => {
      if (data?.liked !== undefined) {
        setIsLiked(Boolean(data.liked));
      }
      if (typeof data?.totalLikes === "number") {
        setLikes(data.totalLikes);
      }

      queryClient.invalidateQueries(["posts"]);
      queryClient.invalidateQueries(["post", postId]);
    },
    onError: (error, variables, context) => {
      if (context) {
        setIsLiked(context.previousLiked);
        setLikes(context.previousLikes);
      }
    },
  });

  function handleLike() {
    setIsPopping(true);
    setTimeout(() => setIsPopping(false), 200);
    mutate();
  }

  function handleNavigate() {
    navigate(link);
  }

  return (
    <div className="flex gap-4 items-center justify-start pt-4">
      <button
        className={`cursor-pointer text-xl flex items-center gap-2 transition-transform duration-200 ${
          isLiked ? "text-red-500" : undefined
        } ${isPopping ? "scale-125" : "scale-100"}`}
        onClick={handleLike}
      >
        {isLiked ? <GoHeartFill /> : <GoHeart />}
        {likesCount > 0 && (
          <span className="text-[12px] font-semibold">{likesCount}</span>
        )}
      </button>

      <button
        className="cursor-pointer text-xl flex items-center gap-2"
        onClick={handleNavigate}
      >
        <FaRegComment />
      </button>
    </div>
  );
}

export default PostActions;
