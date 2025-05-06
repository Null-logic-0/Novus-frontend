import { useState } from "react";
import { HeadProvider, Title } from "react-head";

import PagesHeader from "../../components/PagesHeader";
import SearchInput from "../../components/SearchInput";
import UserList from "../../components/UserList";
import MainContainer from "../../components/MainContainer";
import LoadingIndicator from "../../components/UI/LoadingIndicator";
import ErrorBlock from "../../components/UI/ErrorBlock";
import { useAllUsers } from "../../hooks/useAllUsers";

function Search() {
  const { data, isLoading, isError, error } = useAllUsers();
  const [searchTerm, setSearchTerm] = useState("");

  const users = data?.data?.users || [];

  const filteredUsers = searchTerm
    ? users.filter((user) =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : users;

  return (
    <>
      <HeadProvider>
        <Title>Search | Novus</Title>
      </HeadProvider>

      <div className="w-full justify-center mx-0 gap-5 flex flex-col items-center">
        <PagesHeader title={"Search"} />
        <MainContainer>
          <div className="p-6 max-md:p-2">
            <SearchInput
              onSubmit={(e) => e.preventDefault()}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <hr className="border-[#4d4d4d]" />

          <p className="text-[#4d4d4d] text-[16px] font-semibold max-md:px-2 px-6 py-2 max-md:text-sm">
            Follow suggestions
          </p>

          <section className="px-6 py-4 max-md:px-2 max-md:py-2">
            {isLoading && (
              <div className="flex w-full justify-center items-center">
                <LoadingIndicator />
              </div>
            )}
            {isError && (
              <ErrorBlock
                title="Failed to fetch users data!"
                message={error?.message || "An unknown error occurred."}
              />
            )}
            {!isLoading && !isError && <UserList users={filteredUsers} />}
          </section>
        </MainContainer>
      </div>
    </>
  );
}

export default Search;
