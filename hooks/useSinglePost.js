import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { getSinglePost } from "../util/http";

export const useSinglePost = (postId) => {
  const { token } = useAuth();

  const {
    isPending,
    isError,
    data: post,
    error,
  } = useQuery({
    queryKey: ["post", { id: postId }],
    queryFn: () => getSinglePost({ token, id: postId }),
    enabled: !!token && !!postId,
  });

  return { isPending, isError, post, error, token };
};
