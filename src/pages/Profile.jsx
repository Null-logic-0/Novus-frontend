import { Helmet } from "react-helmet";
import { useParams } from "react-router";

import ProfileHeader from "../../components/ProfileHeader";
import CreatePostBar from "../../components/Posts/CreatePostBar";
import ContentContainer from "../../components/ContentContainer";
import PostItem from "../../components/Posts/PostItem";
import PagesHeader from "../../components/PagesHeader";
import MainContainer from "../../components/MainContainer";

const POSTS = [
  {
    id: 1,
    profile: "/src/assets/default.jpg",
    name: "Luka",
    content: [
      {
        id: "23e",
        media: ["/src/assets/testImg/img1.jpg", "/src/assets/testImg/vid1.mov"],
        likes: "2",
        caption: "Hello world!",
        comments: "2",
        time: "1s",
      },
    ],
  },
];

function Profile() {
  const params = useParams();
  return (
    <>
      <Helmet>
        <title>{params.slug} | Novus</title>
      </Helmet>
      <PagesHeader title="Profile" />

      <MainContainer>
        <ProfileHeader />
        <hr className="border-[#4d4d4d]" />

        <CreatePostBar />
        {POSTS.map((post) => (
          <ContentContainer key={post.id}>
            {post.content.map((contentItem) => (
              <PostItem
                key={contentItem.id}
                name={post.name}
                caption={contentItem.caption}
                media={contentItem.media}
                likes={contentItem.likes}
                time={contentItem.time}
                link={`/${post.id}/post/${contentItem.id}`}
                comments={contentItem.comments}
              />
            ))}
          </ContentContainer>
        ))}
      </MainContainer>
    </>
  );
}

export default Profile;
