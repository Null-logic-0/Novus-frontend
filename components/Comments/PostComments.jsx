import { useState } from "react";
import Comments from "./Comments";
import CreateComent from "./CreateComent";
import { useQuery } from "@tanstack/react-query";
import { getComments } from "../../util/http";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";

function PostComments({ postId, post, userId }) {
  const { token } = useAuth();
  const [parentCommentId, setParentCommentId] = useState(null);

  const {
    data: comments,
    isError,
    error,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments({ postId, token }),
  });

  if (isError) {
    toast.error(error.info?.message);
  }

  return (
    <>
      <Comments
        userId={userId}
        postId={postId}
        setParentCommentId={setParentCommentId}
        comments={comments?.data?.comments || []}
      />
      <CreateComent
        placeholder={
          parentCommentId
            ? `Reply to this comment...`
            : `Add comment on ${post}'s post`
        }
        parentCommentId={parentCommentId}
        postId={postId}
      />
    </>
  );
}

export default PostComments;
