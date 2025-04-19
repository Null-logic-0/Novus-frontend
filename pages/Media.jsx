import { useParams } from "react-router";

function Media() {
  const params = useParams();
  return <div>Media id:{params.postId}</div>;
}

export default Media;
