import ProfileAvatar from "./ProfileAvatar";
import Button from "./UI/Button";

function UserList({ users }) {
  return (
    <ul className="flex gap-4 flex-col">
      {users.map((user) => (
        <>
          <li className="flex justify-between items-center" key={user.id}>
            <div className="flex items-center gap-2">
              <ProfileAvatar link={"user"} alt={"user"} />
              <p>{user.name}</p>
            </div>
            <Button className="bg-white w-30 rounded-xl p-2">Follow</Button>
          </li>
          <hr className="border-[#4d4d4d]" />
        </>
      ))}
    </ul>
  );
}

export default UserList;
