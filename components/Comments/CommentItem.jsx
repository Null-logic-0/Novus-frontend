import { Link } from "react-head";
import { formatPostDate } from "../../helper/formatDate";
import ProfileAvatar from "../ProfileAvatar";
import CommentActions from "./CommentActions";
import CommentReplies from "./CommentReplies";
import CommentDropdownMenu from "./CommentDropdownMenu";

function CommentItem({
  comment,
  setParentCommentId,
  commentId,
  postId,
  comments,
}) {
  return (
    <div className="flex  items-start gap-3">
      <ProfileAvatar
        link={`/${comment.user?._id}`}
        alt={`${comment.user?.fullName} profile avatar`}
        img={comment.user?.profileImage}
      />

      <div className="flex flex-col items-start gap-2  w-full">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-2">
            <p className="font-bold">{comment.user?.fullName}</p>
            <span className="text-sm font-semibold opacity-50">
              {formatPostDate(comment.createdAt)}
            </span>
          </div>
          <CommentDropdownMenu commentId={commentId} />
        </div>

        <p>{comment.text}</p>
        {comments.map((comment) => (
          <CommentActions
            key={comment._id}
            commentId={comment._id}
            likes={comment.likes}
            postId={postId}
            setParentCommentId={setParentCommentId}
            initialLikes={comment.likes.length}
          />
        ))}

        <CommentReplies
          setParentCommentId={setParentCommentId}
          comment={comment}
        />
      </div>
    </div>
  );
}

export default CommentItem;
