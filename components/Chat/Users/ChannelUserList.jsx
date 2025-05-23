import { useDispatch } from "react-redux";
import { useCreateChat } from "../../../hooks/useCreateChat";
import { useAllUsers } from "../../../hooks/useAllUsers";
import { useAuth } from "../../../hooks/useAuth";
import { hideUsers } from "../../../store/UI-slice";

import LoadingIndicator from "../../UI/LoadingIndicator";
import Empty from "../ChatIsEmpty";
import UserListItem from "./UserListItem";

function ChannelUserList({ searchTerm }) {
  const { token } = useAuth();
  const { isError, error, isLoading, data: userData } = useAllUsers();
  const dispatch = useDispatch();

  const users = userData?.data?.users || [];

  const filteredUsers = searchTerm
    ? users.filter((user) =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : users;

  const { mutate } = useCreateChat();

  function handleCreateChat(userId) {
    mutate({ token, userIds: [userId] });
    dispatch(hideUsers());
  }
  return (
    <>
      <ul className="flex flex-col gap-[11.5px]">
        {!isLoading &&
          !isError &&
          filteredUsers.map((user) => (
            <UserListItem
              onClick={() => handleCreateChat(user._id)}
              key={user._id}
              fullName={user.fullName}
              img={user.profileImage}
            />
          ))}

        {!isLoading && !isError && users.length === 0 && (
          <div className="flex flex-col h-full justify-center px-[8px] py-[11px]">
            <Empty text="No users found" />
          </div>
        )}
        {isLoading && (
          <li className="flex flex-col h-full justify-center items-center">
            <LoadingIndicator />
          </li>
        )}
        {isError && (
          <ErrorBlock
            title="Failed to fetch users data!"
            message={error?.message || "An unknown error occurred."}
          />
        )}
      </ul>
    </>
  );
}

export default ChannelUserList;
