import { useState } from "react";
import { HeadProvider, Title } from "react-head";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../util/http";
import { useAuth } from "../../hooks/useAuth";

import PagesHeader from "../../components/PagesHeader";
import SearchInput from "../../components/SearchInput";
import UserList from "../../components/UserList";
import MainContainer from "../../components/MainContainer";
import LoadingIndicator from "../../components/UI/LoadingIndicator";
import ErrorBlock from "../../components/UI/ErrorBlock";

function Search() {
  const { token } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(token),
    enabled: !!token,
  });

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
          <div className="p-6">
            <SearchInput
              onSubmit={(e) => e.preventDefault()}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <hr className="border-[#4d4d4d]" />

          <p className="text-[#4d4d4d] text-[16px] font-semibold px-6 py-2">
            Follow suggestions
          </p>

          <section className="px-6 py-4">
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
