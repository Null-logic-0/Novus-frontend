import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../util/http";
import { useAuth } from "./useAuth";

export function usePosts() {
  const { token, userData } = useAuth();
  const {
    data: postData,
    isError,
    error,
    isPending,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(token),
    enabled: !!token,
  });

  return { userData, postData, isError, error, isPending, token };
}
