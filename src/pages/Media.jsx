import { useNavigate, useParams } from "react-router";
import MediaGallery from "../../components/Posts/MediaGallery";
import { useSinglePost } from "../../hooks/useSinglePost";
import Carousel from "../../components/Carousel";
import LoadingIndicator from "../../components/UI/LoadingIndicator";
import { MdClose } from "react-icons/md";

function Media() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { post: postData, isPending, isError, error } = useSinglePost(postId);
  const post = postData?.data?.post;

  function handleNavigate() {
    navigate(-1);
  }

  return (
    <>
      <button
        onClick={handleNavigate}
        className=" max-md:text-sm max-md:p-2 text-xl left-2 top-3 fixed cursor-pointer z-10 text-white bg-[#1f1f1f] rounded-full p-4"
      >
        <MdClose />
      </button>
      {!isPending && <Carousel media={post?.media} />}
      {isPending && (
        <div className="flex items-center h-screen justify-center">
          {isPending && <LoadingIndicator />}
        </div>
      )}
      {isError && (
        <div className="flex items-center justify-center h-screen text-center text-gray-500">
          {error.info?.message}
        </div>
      )}
    </>
  );
}

export default Media;
