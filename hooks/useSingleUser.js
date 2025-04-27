import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { getUser } from "../util/http";

export const useSingleUser = (userId) => {
  const { token } = useAuth();

  const {
    isError,
    error,
    isPending,
    data: user,
  } = useQuery({
    queryKey: ["user", { id: userId }],
    queryFn: () => getUser({ token, id: userId }),
    enabled: !!token && !!userId,
  });

  return { isPending, isError, user, error, token };
};
