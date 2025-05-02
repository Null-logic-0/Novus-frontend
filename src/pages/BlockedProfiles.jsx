import { HeadProvider, Title } from "react-head";
// import UserList from "../../components/UserList";

function BlockedProfiles() {
  return (
    <>
      <HeadProvider>
        <Title>Blocked Profiles | Novus</Title>
      </HeadProvider>
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold opacity-50">Blocked Users</h2>
        <hr className="border-[#4d4d4d]" />

        {/* <UserList users={USER} /> */}
      </div>
    </>
  );
}

export default BlockedProfiles;
