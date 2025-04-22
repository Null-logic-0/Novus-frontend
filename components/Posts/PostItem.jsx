import { Link } from "react-router";

import ProfileAvatar from "../ProfileAvatar";
import MediaGallery from "./MediaGallery";
import PostActions from "./PostActions";

function PostItem({
  profileImg,
  name,
  caption,
  time,
  media = [],
  likes,
  comments,
  link,
}) {
  return (
    <div className="flex items-start max-md:justify-center   gap-2 ">
      <ProfileAvatar alt={name} img={profileImg} />

      <div className="flex flex-col p-[2px]">
        <p className="font-bold text-[14px]">
          <Link to="user" className="hover:underline">
            {name}
          </Link>
          <span className="ml-2 text-sm opacity-50 font-semibold ">{time}</span>
        </p>
        <p className="text-[14px]">{caption}</p>

        <MediaGallery media={media} />
        <PostActions likes={likes} comments={comments} link={link} />
      </div>
    </div>
  );
}

export default PostItem;
