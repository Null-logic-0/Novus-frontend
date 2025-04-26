import { useState } from "react";
import Comments from "./Comments";

function CommentReplies({ comment, setParentCommentId }) {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <>
      {comment.replies && comment.replies.length > 0 && (
        <div className="w-full flex-col flex gap-4 items-start">
          <button
            className="text-sm text-white font-semibold  cursor-pointer"
            onClick={() => setShowReplies(!showReplies)}
          >
            Show replies ({comment.replies.length})
          </button>
          {showReplies && (
            <Comments
              comments={comment.replies}
              setParentCommentId={setParentCommentId}
            />
          )}
        </div>
      )}
    </>
  );
}

export default CommentReplies;
