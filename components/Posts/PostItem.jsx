import { Link } from "react-router";

import ProfileAvatar from "../ProfileAvatar";
import MediaGallery from "./MediaGallery";
import PostActions from "./PostActions";
import PostDropdownMenu from "./PostDropdownMenu";
import { formatPostDate } from "../../helper/formatDate";
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
      <div className="flex items-start max-md:justify-center w-full  gap-2 ">
        <ProfileAvatar alt={name} img={profileImg} />

        <div className="flex flex-col p-[2px]">
          <FollowUnfollowButton userId={userId} />
          <p className="font-bold text-[14px]">
            <Link to={`/${userId}`} className="hover:underline">
              {name}
            </Link>
            <span className="ml-2 text-sm opacity-50 font-semibold ">
              {formatPostDate(date)}
            </span>
          </p>
          <p className="text-[14px]">{caption}</p>

          <MediaGallery media={media} />
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
