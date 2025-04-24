import PagesHeader from "../../components/PagesHeader";
import UserList from "../../components/UserList";
import MainContainer from "../../components/MainContainer";
import { HeadProvider, Title } from "react-head";

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

const options = [
  { label: "All", value: "all" },
  { label: "Follows", value: "follows" },
  { label: "Likes", value: "likes" },
  { label: "Comments", value: "comments" },
];

function Activity() {
  return (
    <>
      <HeadProvider>
        <Title>Activity | Novus</Title>
      </HeadProvider>
      <PagesHeader dropDown={true} options={options} />
      <MainContainer>
        <section className="px-6 py-4">
          <UserList users={USER} />
        </section>
      </MainContainer>
    </>
  );
}

export default Activity;
