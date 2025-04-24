import { useQuery } from "@tanstack/react-query";
import { HeadProvider, Title } from "react-head";

import { useAuth } from "../../hooks/useAuth";
import { getSinglePost } from "../../util/http";

import MainContainer from "../../components/MainContainer";
import PagesHeader from "../../components/PagesHeader";
import ErrorBlock from "../../components/UI/ErrorBlock";
import LoadingIndicator from "../../components/UI/LoadingIndicator";
import { useParams } from "react-router";
import ContentContainer from "../../components/ContentContainer";
import PostItem from "../../components/Posts/PostItem";
import CreateComent from "../../components/Comments/CreateComent";
import Comments from "../../components/Comments/Comments";

function Post() {
  const { postId } = useParams();

  const { token } = useAuth();
  const {
    data: postData,
    isError,
    error,
    isPending,
  } = useQuery({
    queryKey: ["post", { id: postId }],
    queryFn: () => getSinglePost({ token, id: postId }),
    enabled: !!token && !!{ id: postId },
  });
  const post = postData?.data?.post;
  const userId = Number(post?.user?._id);

  return (
    <>
      <HeadProvider>
        <Title> Post | Novus</Title>
      </HeadProvider>
      <div className="w-full justify-center mx-0 gap-5 flex flex-col items-center">
        <PagesHeader title="Post" />
        {!isPending && !isError ? (
          <MainContainer className="rounded-b-none ">
            <ContentContainer className="rounded-t-3xl">
              <PostItem
                postId={post?._id}
                userId={userId}
                profileImg={post?.user?.profileImage}
                name={post?.user?.fullName}
                caption={post?.caption}
                media={post?.media}
                likes={post?.likes}
                date={post?.createdAt}
                comments={post?.comments}
              />
            </ContentContainer>
            <Comments />
            <CreateComent placeholder={post?.user?.fullName} />
          </MainContainer>
        ) : (
          <div className="flex items-center justify-center">
            {isPending && <LoadingIndicator />}
          </div>
        )}
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

export default Post;
