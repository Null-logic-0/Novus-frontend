import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";
import LoadingIndicator from "../../UI/LoadingIndicator";
import Empty from "../ChatIsEmpty";
import UserListItem from "./UserListItem";
import { getCreatedChats } from "../../../util/http";

function ChatUsersList() {
  const { token } = useAuth();

  const { isError, error, data, isPending } = useQuery({
    queryKey: ["chats"],
    queryFn: () => getCreatedChats(token),
  });

  const chats = data?.data?.chats || [];

  return (
    <ul className="flex flex-col gap-[11.5px]">
      {!isPending &&
        !isError &&
        chats.map((chat) => (
          <UserListItem
            link={`inbox/${chat._id}`}
            isChat
            chatId={chat._id}
            key={chat._id}
            fullName={chat.otherUser.fullName}
            img={chat.otherUser.profileImage}
          />
        ))}

      {!isPending && !isError && chats.length === 0 && (
        <div className="flex flex-col h-full justify-center px-[8px] py-[11px]">
          <Empty text="No users found" />
        </div>
      )}
      {isPending && (
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
  );
}

export default ChatUsersList;
