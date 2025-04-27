import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { getSinglePost } from "../util/http";

export const useSinglePost = (postId) => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["post", { id: postId }],
    queryFn: () => getSinglePost({ token, id: postId }),
    enabled: !!token && !!postId,
  });
};
