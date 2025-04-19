import ContentContainer from "../components/ContentContainer";
import CreatePostBar from "../components/CreatePostBar";
import MainContentContainer from "../components/MainContentContainer";
import PostItem from "../components/PostItem";

const POSTS = [
  {
    id: 1,
    profile: "/src/assets/default.jpg",
    name: "Luka",
    caption: "Hello world!",
    media: ["/src/assets/testImg/img1.jpg", "/src/assets/testImg/vid1.mov"],
    likes: 10,
    comments: 3,
    time: "1s",
  },
  {
    id: 2,
    profile: "/src/assets/default.jpg",
    name: "John",
    caption: "Nice day!",
    media: ["/src/assets/testImg/img2.WEBP"],
    likes: 5,
    comments: 1,
    time: "2d",
  },
];

function Posts() {
  return (
    <MainContentContainer>
      <CreatePostBar />
      {POSTS.map((post) => (
        <ContentContainer>
          <PostItem
            key={post.id}
            name={post.name}
            caption={post.caption}
            media={post.media}
            likes={post.likes}
            time={post.time}
            comments={post.comments}
          />
        </ContentContainer>
      ))}
    </MainContentContainer>
  );
}

export default Posts;
