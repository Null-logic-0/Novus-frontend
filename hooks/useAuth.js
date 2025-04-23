import { useQuery } from "@tanstack/react-query";
import { getMe } from "../util/http";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../src/store/authSlice";

export function useAuth() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const {
    isPending,
    isError,
    data: userData,
    error,
  } = useQuery({
    queryKey: ["me"],
    queryFn: () => getMe(token),
    enabled: !!token,
    retry: false,
    onSuccess: (data) => {
      if (data?.token) {
        dispatch(setAuth({ token: data.token }));
      }
    },
  });

  return { isPending, isError, userData, error, token };
}
