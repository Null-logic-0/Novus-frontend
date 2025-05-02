import { HeadProvider, Title } from "react-head";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getBlockedUsers } from "../../util/http";

import UserList from "../../components/UserList";
import LoadingIndicator from "../../components/UI/LoadingIndicator";

function BlockedProfiles() {
  const { token } = useAuth();

  const {
    data: users,
    isError,
    isPending,
    error,
  } = useQuery({
    queryKey: ["blocked-users"],
    queryFn: () => getBlockedUsers(token),
  });
  return (
    <>
      <HeadProvider>
        <Title>Blocked Profiles | Novus</Title>
      </HeadProvider>
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold opacity-50">Blocked Users</h2>
        <hr className="border-[#4d4d4d]" />

        {!isError && !isPending && (
          <UserList users={users?.data?.blockedUsers} isBlocked />
        )}
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
      </div>
    </>
  );
}

export default BlockedProfiles;
