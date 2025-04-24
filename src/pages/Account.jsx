import { HeadProvider, Title } from "react-head";
import FormUI from "../../components/UI/FormUI";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";

function Account() {
  return (
    <>
      <HeadProvider>
        <Title>Account | Novus</Title>
      </HeadProvider>
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold opacity-50">Update password</h2>
        <FormUI>
          <Input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
          />
          <Input type="password" name="password" placeholder="New Password" />
          <Input
            type="password"
            name="passwordConfrim"
            placeholder="Confirm Password"
          />
          <Button className="bg-white">Change password</Button>
        </FormUI>
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
