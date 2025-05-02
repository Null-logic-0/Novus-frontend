import { useMutation } from "@tanstack/react-query";
import { blockUser, queryClient } from "../util/http";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useBlockUser() {
  const navigate = useNavigate();
  const { isPending, mutate } = useMutation({
    mutationFn: blockUser,
    onSuccess: async () => {
      await navigate("/settings/blocked-profiles");
      await queryClient.invalidateQueries({ queryKey: ["blocked-users"] });
      toast.success("Success!");
    },
    onError: (error) => {
      toast.error(
        error?.info?.message || error?.message || "Failed to block user!"
      );
    },
  });

  return { mutate, isPending };
}
