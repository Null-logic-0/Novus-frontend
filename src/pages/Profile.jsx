import { useParams } from "react-router";
import { HeadProvider, Title } from "react-head";
import { useAuth } from "../../hooks/useAuth";
import { useSingleUser } from "../../hooks/useSingleUser";

import { MdContentPasteOff } from "react-icons/md";

import ProfileHeader from "../../components/ProfileHeader";
import CreatePostBar from "../../components/Posts/CreatePostBar";
import ContentContainer from "../../components/ContentContainer";
import PostItem from "../../components/Posts/PostItem";
import PagesHeader from "../../components/PagesHeader";
import MainContainer from "../../components/MainContainer";
import LoadingIndicator from "../../components/UI/LoadingIndicator";
import ErrorBlock from "../../components/UI/ErrorBlock";

function Profile() {
  const { slug } = useParams();

  const { userData: loggedInUser, isPending, isError, error } = useAuth();

  const {
    user: userData,
    isPending: isPostPending,
    isError: isPostError,
    error: postError,
  } = useSingleUser(slug);

  const currentUser = loggedInUser?.data?.user._id === userData?.data?.user._id;

  const errorMessage =
    isError || isPostError ? error?.message || postError?.message : null;

  return (
    <>
      <HeadProvider>
        <Title>Profile | Novus</Title>
      </HeadProvider>
      <div className="w-full justify-center mx-0 gap-5 flex flex-col items-center">
        <PagesHeader title="Profile" />

        <MainContainer>
          <ProfileHeader
            userData={userData}
            currentUser={currentUser}
            userId={slug}
          />

          {currentUser && (
            <>
              <hr className="border-[#4d4d4d]" />
              <CreatePostBar />
            </>
          )}

          {(!isPending || isPostPending) &&
          (!isError || isError) &&
          userData?.data?.user?.postsVirtual?.length > 0 ? (
            userData?.data?.user?.postsVirtual.map((post) => (
              <ContentContainer key={post._id}>
                <PostItem
                  userId={post.user._id}
                  postId={post._id}
                  profileImg={post.user.profileImage}
                  name={post.user.fullName}
                  caption={post.caption}
                  media={post.media}
                  likes={post.likes}
                  initialLikes={post.likes.length}
                  date={post.createdAt}
                  link={`/posts/${post.user._id}/post/${post._id}`}
                  comments={post.comments}
                />
                {userData?.data?.user?.blockedUsers?.length < 0 && (
                  <p>user blocked</p>
                )}
              </ContentContainer>
            ))
          ) : (
            <>
              <hr className="border-[#4d4d4d]" />
              <p className="flex opacity-50 flex-col items-center gap-2 p-4">
                <MdContentPasteOff className="text-4xl" />
                <span className="font-semibold text-xl">No posts</span>
              </p>
            </>
          )}

          {isPending || isPostPending ? (
            <div className="flex flex-col items-center justify-center">
              <LoadingIndicator />
            </div>
          ) : null}

          {errorMessage && (
            <ErrorBlock title="Failed to fetch data" message={errorMessage} />
          )}
        </MainContainer>
      </div>
    </>
  );
}

export default Profile;
