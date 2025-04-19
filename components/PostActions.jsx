import { FaRegComment } from "react-icons/fa";
import { TbShare2 } from "react-icons/tb";

import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { useState } from "react";

function PostActions({ likes, comments }) {
  const [isLiked, setIsLiked] = useState(false);

  function handleLike() {
    setIsLiked(!isLiked);
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
      <button className="cursor-pointer text-xl flex items-center gap-2">
        <FaRegComment />
        <span className="text-[12px] font-semibold">{comments}</span>
      </button>
      <button className="cursor-pointer text-xl">
        <TbShare2 />
      </button>
    </div>
  );
}

export default PostActions;
