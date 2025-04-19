import { Link } from "react-router";
import defaultImg from "../src/assets/default.jpg";
import { twMerge } from "tailwind-merge";

function ProfileAvatar({ link, img, alt, className }) {
  return (
    <>
      {link ? (
        <Link to={link}>
          <img
            src={img || defaultImg}
            alt={alt}
            className={twMerge(
              "object-cover w-10 h-10 rounded-full",
              className
            )}
          />
        </Link>
      ) : (
        <img
          src={img || defaultImg}
          alt={alt}
          className={twMerge("object-cover w-10 h-10 rounded-full", className)}
        />
      )}
    </>
  );
}

export default ProfileAvatar;
