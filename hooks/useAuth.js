import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { getMe, logout as logoutRequest } from "../util/http";
import { clearAuth, setAuth } from "../src/store/authSlice";

import toast from "react-hot-toast";

export function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const logout = async () => {
    try {
      await logoutRequest();
    } catch (err) {
      console.error("Logout request failed", err);
      toast.error("Logout request failed!");
    } finally {
      dispatch(clearAuth());
      navigate("/login");
    }
  };

  return { isPending, isError, userData, error, token, logout };
}
