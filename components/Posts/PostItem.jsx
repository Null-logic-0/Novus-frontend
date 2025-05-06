import { Link } from "react-router";

import ProfileAvatar from "../ProfileAvatar";
import MediaGallery from "./MediaGallery";
import PostActions from "./PostActions";
import PostDropdownMenu from "./PostDropdownMenu";
import { formatDate } from "../../helper/formatDate";
import { useAuth } from "../../hooks/useAuth";
import FollowUnfollowButton from "../FollowUnfollowButton";

function PostItem({
  profileImg,
  name,
  caption,
  date,
  media = [],
  likes,
  initialLikes,
  link,
  userId,
  postId,
}) {
  const { userData } = useAuth();

  return (
    <div className="flex justify-between w-full items-start">
      <div className="flex items-start  w-full  gap-2 ">
        <ProfileAvatar alt={name} img={profileImg} />

        <div className="flex flex-col p-[2px]">
          <FollowUnfollowButton userId={userId} />
          <p className="font-bold text-[14px] ">
            <Link to={`/${userId}`} className="hover:underline">
              {name}
            </Link>
            <span className="ml-2 text-sm opacity-50 font-semibold ">
              {formatDate(date)}
            </span>
          </p>
          <p className="text-[14px] max-md:text-[12px]">{caption}</p>
          <MediaGallery
            className="overflow-x-scroll pt-2 max-w-[550px] max-md:max-w-[260px] max-md:pr-4 flex  items-start gap-2 pr-6  scrollbar-hide"
            media={media}
            link={`/${userId}/post/${postId}/media`}
          />
          <PostActions
            initialLikes={initialLikes}
            postId={postId}
            likes={likes}
            link={link}
          />
        </div>
      </div>
      {userData?.data?.user?._id === userId && (
        <PostDropdownMenu postId={postId} />
      )}
    </div>
  );
}

export default PostItem;
