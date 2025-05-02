import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import { updatePassword } from "../../util/http";

import toast from "react-hot-toast";
import FormUI from "../UI/FormUI";
import Input from "../UI/Input";
import Button from "../UI/Button";
import ErrorBlock from "../UI/ErrorBlock";

function UpdatePassword() {
  const { token, logout } = useAuth();

  const { isError, error, mutate, isPending } = useMutation({
    mutationFn: updatePassword,
    onSuccess: async () => {
      toast.success("Password updated successfully!");

      await logout();
    },
  });

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    mutate({ data: formData, token });
  }
  return (
    <>
      <FormUI onSubmit={handleSubmit}>
        <Input
          type="password"
          name="passwordCurrent"
          placeholder="Current Password"
        />
        <Input type="password" name="password" placeholder="New Password" />
        <Input
          type="password"
          name="passwordConfirm"
          placeholder="Confirm Password"
        />

        <Button className="bg-white" disabled={isPending}>
          {isPending ? "Submitting..." : "Change password"}
        </Button>
      </FormUI>
      {isError && (
        <>
          <ErrorBlock
            title="Failed to update user password!"
            message={error.info?.message || "Invalid data provided"}
          />
        </>
      )}
    </>
  );
}

export default UpdatePassword;
