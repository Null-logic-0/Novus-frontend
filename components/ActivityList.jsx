import { formatDate } from "../helper/formatDate";
import ProfileAvatar from "./ProfileAvatar";

function ActivityList({ isError, isPending, userActivities }) {
  return (
    <ul className="flex flex-col gap-4">
      {!isPending && !isError && userActivities.data.activities.length > 0 ? (
        userActivities.data.activities.map((activity) => (
          <li className="flex items-center justify-between" key={activity._id}>
            <div className="flex items-center gap-2">
              <ProfileAvatar
                img={activity.fromUser.profileImage}
                link={`/${activity.fromUser._id}`}
                alt={`${activity.fromUser.fullName}-avatar`}
              />
              <div className="flex  items-center flex-wrap gap-2">
                <p className="text-sm font-semibold opacity-50 max-md:text-[12px]">
                  {activity.fromUser.fullName}
                </p>
                -
                {activity.type === "like" ? (
                  <p className="text-white opacity-50 max-md:text-[12px] text-sm font-semibold">
                    Liked your post {formatDate(activity.createdAt)}
                  </p>
                ) : (
                  <p className="text-white opacity-50 text-sm  max-md:text-[12px] font-semibold">
                    Followed you {formatDate(activity.createdAt)}
                  </p>
                )}
              </div>
            </div>

            {/* {activity.type === "like" && (
              <img
                className="w-10 h-10 object-cover rounded-lg max-md:w-8 max-md:h-8 max-md:rounded-none"
                src={activity?.targetPost?.media[0]}
                alt={`${activity?.targetPost?.user.fullName}-avatar`}
              />
            )} */}

            {activity.type === "like" && (
              <>
                {!activity?.targetPost?.media[0]?.match(
                  /\.(mp4|webm|ogg)$/
                ) && (
                  <img
                    className="w-10 h-10 object-cover rounded-lg max-md:w-8 max-md:h-8 max-md:rounded-none"
                    src={activity?.targetPost?.media[0]}
                    alt={`${activity?.targetPost?.user.fullName}-image`}
                  />
                )}
              </>
            )}
          </li>
        ))
      ) : (
        <li className="text-center text-white opacity-50 text-lg font-semibold">
          No activities yet.
        </li>
      )}
    </ul>
  );
}

export default ActivityList;
