import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../util/http";
import { useAuth } from "./useAuth";

export function usePosts(filter) {
  const { token, userData } = useAuth();
  const {
    data: postData,
    isError,
    error,
    isPending,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(token, filter),
    enabled: !!token,
  });

  return { userData, postData, isError, error, isPending, token };
}
