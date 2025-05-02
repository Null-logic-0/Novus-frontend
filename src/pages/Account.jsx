import { HeadProvider, Title } from "react-head";
import { useAuth } from "../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../../util/http";

import FormUI from "../../components/UI/FormUI";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import toast from "react-hot-toast";
import ErrorBlock from "../../components/UI/ErrorBlock";

function Account() {
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
      <HeadProvider>
        <Title>Account | Novus</Title>
      </HeadProvider>
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold opacity-50">Update password</h2>
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
        <hr className="border-[#4d4d4d]" />
        <h2 className="font-semibold opacity-50">Delete account</h2>
        <Button className="text-red-500 w-40 border border-[#4d4d4d]">
          Delete Account
        </Button>
        <p className="text-sm opacity-50 font-semibold">
          Deleting your account will deactivate and permanently remove it from
          our platform.
        </p>
      </div>
    </>
  );
}

export default Account;
