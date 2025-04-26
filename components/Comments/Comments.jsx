import ContentContainer from "../ContentContainer";
import CommentItem from "./CommentItem";

function Comments({ comments, setParentCommentId }) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {comments?.map((comment) => (
        <ContentContainer key={comment._id}>
          <CommentItem
            comment={comment}
            commentId={comment._id}
            setParentCommentId={setParentCommentId}
          />
        </ContentContainer>
      ))}
    </div>
  );
}

export default Comments;
