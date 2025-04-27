import ProfileAvatar from "./ProfileAvatar";
import Button from "./UI/Button";

function UserList({ users = [] }) {
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
                link={`/${user._id}`}
                alt={`${user?.fullName}-avatar`}
                img={user?.profileImage}
              />
              <p>{user.fullName}</p>
            </div>
            <Button className="bg-white w-30 rounded-xl p-2">Follow</Button>
          </li>
        ))
      )}
    </ul>
  );
}

export default UserList;
