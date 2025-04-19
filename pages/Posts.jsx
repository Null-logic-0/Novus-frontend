import ContentContainer from "../components/ContentContainer";
import CreatePostBar from "../components/CreatePostBar";
import MainContentContainer from "../components/MainContentContainer";
import PostItem from "../components/PostItem";

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

function Posts() {
  return (
    <MainContentContainer>
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
    </MainContentContainer>
  );
}

export default Posts;
