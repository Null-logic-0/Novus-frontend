import FollowUnfollowButton from "./FollowUnfollowButton";
import ProfileAvatar from "./ProfileAvatar";
import UnblockButton from "./UnblockButton";

function UserList({ users = [], isBlocked }) {
  return (
    <ul className="flex gap-4 flex-col">
      {users.length === 0 ? (
        <h2 className="text-white font-semibold opacity-50 text-lg text-center">
          No users found!
        </h2>
      ) : (
        users.map((user) => (
          <li className="flex justify-between items-center" key={user._id}>
            <div className="flex items-center gap-2">
              <ProfileAvatar
                link={`${isBlocked ? "#" : `/${user._id}`}`}
                alt={`${user?.fullName}-avatar`}
                img={user?.profileImage}
              />
              <p className="text-white font-semibold">{user.fullName}</p>
            </div>

            {isBlocked ? (
              <UnblockButton userId={user._id} />
            ) : (
              <FollowUnfollowButton isFullButton userId={user._id} />
            )}
          </li>
        ))
      )}
    </ul>
  );
}

export default UserList;
