import { HeadProvider, Title } from "react-head";
import { usePosts } from "../../hooks/usePosts";

import { MdContentPasteOff } from "react-icons/md";
import ContentContainer from "../../components/ContentContainer";
import PostItem from "../../components/Posts/PostItem";
import LoadingIndicator from "../../components/UI/LoadingIndicator";
import ErrorBlock from "../../components/UI/ErrorBlock";

function Posts() {
  const { postData, isError, error, isPending, userData } = usePosts();

  return (
    <>
      <HeadProvider>
        <Title>Posts | Novus</Title>
      </HeadProvider>

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
      {isPending && (
        <div className="flex flex-col w-full items-center justify-center">
          <hr className=" border-[#383838] border w-full" />
          <LoadingIndicator />
        </div>
      )}
      {isError && (
        <>
          <hr className=" border-[#383838] border w-full" />
          <div className="px-4">
            <ErrorBlock
              title="Failed to fetch post data!"
              message={error.info?.message}
            />
          </div>
        </>
      )}
    </>
  );
}

export default Posts;
