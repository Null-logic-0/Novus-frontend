import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";

import UserList from "./UserList";
import LoadingIndicator from "./UI/LoadingIndicator";

function FollowList({ title, fetchUser, queryKey, listKey, userId }) {
  const { token } = useAuth();

  const {
    isPending,
    isError,
    error,
    data: users,
  } = useQuery({
    queryKey: [queryKey, userId],
    queryFn: () => fetchUser({ token, id: userId }),
  });

  const userList = users?.data?.[listKey] ?? [];

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-center text-white opacity-50 text-xl font-semibold">
        {title}
      </h2>
      <hr className="border-[#4d4d4d]" />

      {isPending && (
        <div className="flex w-full justify-center items-center">
          <LoadingIndicator />
        </div>
      )}

      {isError && (
        <p className="text-center text-white opacity-50 text-lg font-semibold">
          {error.message}
        </p>
      )}

      {!isPending && !isError && <UserList users={userList} />}
    </div>
  );
}

export default FollowList;
