import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../util/http";
import { useAuth } from "./useAuth";

export function useAllUsers() {
  const { token } = useAuth();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(token),
    enabled: !!token,
  });

  return { data, isLoading, isError, error };
}
