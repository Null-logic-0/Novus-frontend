import { Helmet } from "react-helmet";
import MainContentContainer from "../../components/MainContentContainer";
import PagesHeader from "../../components/PagesHeader";
import SearchInput from "../../components/SearchInput";
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

function Search() {
  return (
    <>
      <Helmet>
        <title>Search | Novus</title>
      </Helmet>
      <PagesHeader title={"Search"} />
      <MainContentContainer>
        <div className="p-6">
          <SearchInput />
        </div>
        <hr className="border-[#4d4d4d]" />
        <p className="text-[#4d4d4d] text-[16px] font-semibold px-6 py-2">
          Follow suggestions
        </p>
        <section className="px-6 py-4">
          <UserList users={USER} />
        </section>
      </MainContentContainer>
    </>
  );
}

export default Search;
