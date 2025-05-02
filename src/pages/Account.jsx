import { HeadProvider, Title } from "react-head";

import UpdatePassword from "../../components/Authorization/UpdatePassword";
import DeleteAccount from "../../components/Authorization/DeleteAccount";

function Account() {
  return (
    <>
      <HeadProvider>
        <Title>Account | Novus</Title>
      </HeadProvider>
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold opacity-50">Update password</h2>
        <UpdatePassword />
        <hr className="border-[#4d4d4d]" />
        <h2 className="font-semibold opacity-50">Delete account</h2>
        <DeleteAccount />
        <p className="text-sm opacity-50 font-semibold">
          Deleting your account will deactivate and permanently remove it from
          our platform.
        </p>
      </div>
    </>
  );
}

export default Account;
