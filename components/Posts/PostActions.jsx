import { FaRegComment } from "react-icons/fa";

import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { useState } from "react";
import { useNavigate } from "react-router";

function PostActions({ likes, comments, link }) {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  function handleLike() {
    setIsLiked(!isLiked);
  }

  function handleNavigate() {
    navigate(link);
  }

  return (
    <div className="flex gap-4 items-center justify-start pt-4">
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
        className="cursor-pointer text-xl flex items-center gap-2"
        onClick={handleNavigate}
      >
        <FaRegComment />
        <span className="text-[12px] font-semibold">{comments}</span>
      </button>
    </div>
  );
}

export default PostActions;
