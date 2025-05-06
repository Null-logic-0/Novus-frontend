import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { getCreatedChats } from "../util/http";

export function useChats() {
  const { token } = useAuth();

  const { isError, error, data, isPending } = useQuery({
    queryKey: ["chats"],
    queryFn: () => getCreatedChats(token),
  });

  return { isError, error, data, isPending };
}
