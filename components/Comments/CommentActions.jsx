import { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useAuth } from "../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { commentLike, queryClient } from "../../util/http";

function CommentActions({
  setParentCommentId,
  commentId,
  initialLikes,
  likes,
  postId,
}) {
  const { token, userData } = useAuth();

  const isLikedByUser = likes?.some(
    (like) => like[0] === userData?.data?.user._id
  );

  const [isLiked, setIsLiked] = useState(isLikedByUser);
  const [likesCount, setLikes] = useState(initialLikes ?? 0);
  const [isPopping, setIsPopping] = useState(false);

  const { mutate } = useMutation({
    mutationFn: () => commentLike({ token, id: commentId }),
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

      queryClient.invalidateQueries(["comments", postId]);
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

  const handleReply = () => {
    setParentCommentId(commentId);
  };

  return (
    <div className="flex items-center gap-2">
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
        onClick={handleReply}
        className="text-xl text-white font-semibold cursor-pointer"
      >
        <FaRegComment />
      </button>
    </div>
  );
}

export default CommentActions;
