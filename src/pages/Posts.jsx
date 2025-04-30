import { HeadProvider, Title } from "react-head";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../util/http";
import { useAuth } from "../../hooks/useAuth";

import { MdContentPasteOff } from "react-icons/md";
import PagesHeader from "../../components/PagesHeader";
import ContentContainer from "../../components/ContentContainer";
import PostItem from "../../components/Posts/PostItem";
import MainContainer from "../../components/MainContainer";
import CreatePostBar from "../../components/Posts/CreatePostBar";
import LoadingIndicator from "../../components/UI/LoadingIndicator";
import ErrorBlock from "../../components/UI/ErrorBlock";

const options = [
  { label: "Feed", value: "feed" },
  { label: "Followers", value: "followers" },
  { label: "Liked", value: "liked" },
];

function Posts() {
  const { token, userData } = useAuth();
  const {
    data: postData,
    isError,
    error,
    isPending,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(token),
    enabled: !!token,
  });

  return (
    <>
      <HeadProvider>
        <Title>Posts | Novus</Title>
      </HeadProvider>
      <div className="w-full justify-center mx-0 gap-5 flex flex-col items-center">
        <PagesHeader dropDown={true} options={options} />
        <MainContainer>
          <CreatePostBar />

          {!isPending && !isError && postData?.data?.posts?.length > 0
            ? postData.data.posts.map((post) => (
                <ContentContainer key={post._id}>
                  <PostItem
                    userId={post?.user._id || userData?.data?.user._id}
                    postId={post._id}
                    profileImg={post.user.profileImage}
                    name={post.user.fullName}
                    caption={post.caption}
                    media={post.media}
                    likes={post.likes ?? []}
                    initialLikes={post.likes.length}
                    date={post.createdAt}
                    link={`posts/${post.user._id}/post/${post._id}`}
                  />
                </ContentContainer>
              ))
            : !isPending &&
              !isError && (
                <>
                  <hr className="border-[#4d4d4d]" />
                  <p className="flex opacity-50 flex-col items-center gap-2 p-4">
                    <MdContentPasteOff className="text-4xl" />
                    <span className="font-semibold text-xl">No posts</span>
                  </p>
                </>
              )}
        </MainContainer>
        <div className="flex items-center justify-center">
          {isPending && <LoadingIndicator />}
        </div>
        {isError && (
          <>
            <ErrorBlock
              title="Failed to fetch post data!"
              message={error.info?.message}
            />
          </>
        )}
      </div>
    </>
  );
}

export default Posts;
