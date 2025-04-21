import { Helmet } from "react-helmet";
import PagesHeader from "../../components/PagesHeader";
import MainContentContainer from "../../components/MainContentContainer";
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

const options = [
  { label: "All", value: "all" },
  { label: "Follows", value: "follows" },
  { label: "Likes", value: "likes" },
  { label: "Comments", value: "comments" },
];

function Activity() {
  return (
    <>
      <Helmet>
        <title>Activity | Novus</title>
      </Helmet>
      <PagesHeader dropDown={true} options={options} />
      <MainContentContainer>
        <section className="px-6 py-4">
          <UserList users={USER} />
        </section>
      </MainContentContainer>
    </>
  );
}

export default Activity;
