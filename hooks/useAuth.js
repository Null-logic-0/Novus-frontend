import { useQuery } from "@tanstack/react-query";
import { getMe } from "../util/http";
import { useDispatch } from "react-redux";
import { setAuth } from "../src/store/authSlice";

export function useAuth() {
  const dispatch = useDispatch();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    enabled: true,
    onSuccess: (data) => {
      if (data?.token) {
        dispatch(setAuth({ token: data.token }));
      }
    },
  });

  return { isLoading, isError, data, error };
}
