import { Helmet } from "react-helmet";

import PagesHeader from "../../components/PagesHeader";
import ContentContainer from "../../components/ContentContainer";
import PostItem from "../../components/Posts/PostItem";
import MainContainer from "../../components/MainContainer";
import CreatePostBar from "../../components/Posts/CreatePostBar";

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

const options = [
  { label: "Feed", value: "feed" },
  { label: "Followers", value: "followers" },
  { label: "Liked", value: "liked" },
];

function Posts() {
  return (
    <>
      <Helmet>
        <title>Home | Novus</title>
      </Helmet>
      <PagesHeader dropDown={true} options={options} />
      <MainContainer>
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
                link={`${post.id}/post/${contentItem.id}`}
                comments={contentItem.comments}
              />
            ))}
          </ContentContainer>
        ))}
      </MainContainer>
    </>
  );
}

export default Posts;
