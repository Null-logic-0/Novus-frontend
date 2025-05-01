import { Outlet } from "react-router";
import MainContainer from "../../components/MainContainer";
import PagesHeader from "../../components/PagesHeader";
import CreatePostBar from "../../components/Posts/CreatePostBar";

const options = [
  { label: "Feed", value: "" },
  { label: "Followings", value: "followings" },
  { label: "Liked", value: "liked" },
];

function FeedRoot() {
  return (
    <div className="w-full justify-center mx-0 gap-5 flex flex-col items-center">
      <PagesHeader dropDown={true} options={options} />
      <MainContainer>
        <CreatePostBar />
        <main>
          <Outlet />
        </main>
      </MainContainer>
    </div>
  );
}

export default FeedRoot;
