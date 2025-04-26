import { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { GoHeart, GoHeartFill } from "react-icons/go";

function CommentActions({ setParentCommentId, commentId, likes }) {
  const [isLiked, setIsLiked] = useState(false);

  function handleLike() {
    setIsLiked(!isLiked);
  }
  const handleReply = () => {
    setParentCommentId(commentId);
  };
  return (
    <div className="flex items-center gap-2">
      <button
        className={`cursor-pointer text-xl flex items-center gap-2 ${
          isLiked ? "text-red-500 transition-all" : undefined
        }`}
        onClick={handleLike}
      >
        {isLiked ? <GoHeartFill /> : <GoHeart />}
        <span className="text-[12px] font-semibold">{likes}</span>
      </button>
      <button
        onClick={() => handleReply(commentId)}
        className="text-xl text-white font-semibold cursor-pointer"
      >
        <FaRegComment />
      </button>
    </div>
  );
}

export default CommentActions;
