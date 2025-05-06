import { useQuery } from "@tanstack/react-query";
import { getChatMessages } from "../util/http";
import { useAuth } from "./useAuth";

export function useMessages(id) {
  const { token, userData } = useAuth();

  const { data } = useQuery({
    queryKey: ["messages", id],
    queryFn: () => getChatMessages({ token, id }),
  });

  return { data, userData };
}
