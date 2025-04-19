import { useParams } from "react-router";

function Post() {
  const params = useParams();
  return <div>Post id:{params.postId}</div>;
}

export default Post;
