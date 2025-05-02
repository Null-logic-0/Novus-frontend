import { useAuth } from "../hooks/useAuth";
import { useBlockUser } from "../hooks/useBlockUser";
import Button from "./UI/Button";

function UnblockButton({ userId }) {
  const { token } = useAuth();

  const { isPending, mutate } = useBlockUser();

  function handleBlockUser() {
    mutate({ token, id: userId });
  }
  return (
    <Button
      onClick={handleBlockUser}
      className="bg-white w-30 p-2 "
      disabled={isPending}
    >
      {isPending ? "Unblocking..." : "Unblock"}
    </Button>
  );
}

export default UnblockButton;
