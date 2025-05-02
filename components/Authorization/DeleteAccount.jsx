import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import { deleteMyAccount } from "../../util/http";

import toast from "react-hot-toast";
import Button from "../UI/Button";

function DeleteAccount() {
  const { token, logout } = useAuth();

  const { isPending, mutate } = useMutation({
    mutationFn: deleteMyAccount,
    onSuccess: async () => {
      toast.success("Account deleted successfully!");
      await logout();
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to delete acccount!");
    },
  });

  async function handleDeleteAccount() {
    if (token) {
      mutate(token);
    } else {
      toast.error("No valid token found.");
    }
  }
  return (
    <Button
      disabled={isPending}
      onClick={handleDeleteAccount}
      className="text-red-500 w-40 border border-[#4d4d4d]"
    >
      {isPending ? "Deleting..." : "Delete Account"}
    </Button>
  );
}

export default DeleteAccount;
