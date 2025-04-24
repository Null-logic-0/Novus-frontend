import { Link } from "react-router";

import ProfileAvatar from "../ProfileAvatar";
import MediaGallery from "./MediaGallery";
import PostActions from "./PostActions";
import PostDropdownMenu from "./PostDropdownMenu";
import { formatPostDate } from "../../helper/formatDate";

function PostItem({
  profileImg,
  name,
  caption,
  date,
  media = [],
  likes,
  comments,
  link,
  userId,
  postId,
}) {
  return (
    <div className="flex justify-between w-full items-start">
      <div className="flex items-start max-md:justify-center w-full  gap-2 ">
        <ProfileAvatar alt={name} img={profileImg} />

        <div className="flex flex-col p-[2px]">
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
          <PostActions likes={likes} comments={comments} link={link} />
        </div>
      </div>
      <PostDropdownMenu postId={postId} />
    </div>
  );
}

export default PostItem;
