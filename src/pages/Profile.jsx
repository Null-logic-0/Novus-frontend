import { useAuth } from "../../hooks/useAuth";
import ProfileHeader from "../../components/ProfileHeader";
import CreatePostBar from "../../components/Posts/CreatePostBar";
import ContentContainer from "../../components/ContentContainer";
import PostItem from "../../components/Posts/PostItem";
import PagesHeader from "../../components/PagesHeader";
import MainContainer from "../../components/MainContainer";
import { MdContentPasteOff } from "react-icons/md";
import { HeadProvider, Title } from "react-head";
import LoadingIndicator from "../../components/UI/LoadingIndicator";

function Profile() {
  const { userData, isPending } = useAuth();

  return (
    <>
      <HeadProvider>
        <Title>User Profile | Novus</Title>
      </HeadProvider>
      <div className="w-full justify-center mx-0 gap-5 flex flex-col items-center">
        <PagesHeader title="Profile" />

        <MainContainer>
          <ProfileHeader userData={userData} />
          <hr className="border-[#4d4d4d]" />

          <CreatePostBar />
          <div className="flex flex-col items-center justify-center">
            {isPending && <LoadingIndicator />}
          </div>

          {userData?.data?.user?.postsVirtual?.length > 0 ? (
            userData?.data?.user?.postsVirtual.map((post) => (
              <ContentContainer key={post._id}>
                <PostItem
                  userId={post.user._id}
                  postId={post._id}
                  key={post._id}
                  profileImg={post.user.profileImage}
                  name={post.user.fullName}
                  caption={post.caption}
                  media={post.media}
                  likes={post.likes}
                  date={post.createdAt}
                  link={`/posts/${post.user._id}/post/${post._id}`}
                  comments={post.comments}
                />
              </ContentContainer>
            ))
          ) : (
            <>
              <hr className="border-[#4d4d4d]" />

              <p className="flex opacity-50  flex-col items-center gap-2 p-4">
                <MdContentPasteOff className="text-4xl" />
                <span className="font-semibold text-xl">No posts</span>
              </p>
            </>
          )}
        </MainContainer>
      </div>
    </>
  );
}

export default Profile;
