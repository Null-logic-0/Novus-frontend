import { Helmet } from "react-helmet";
import UserList from "../../components/UserList";

const USER = [
  {
    id: "123",
    name: "John Doe",
  },
  {
    id: "123s",
    name: "Bob Ross",
  },
];

function BlockedProfiles() {
  return (
    <>
      <Helmet>
        <title>Blocked Profiles | Novus</title>
      </Helmet>
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold opacity-50">Blocked Users</h2>
        <hr className="border-[#4d4d4d]" />

        <UserList users={USER} />
      </div>
    </>
  );
}

export default BlockedProfiles;
