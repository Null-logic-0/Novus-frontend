import { Helmet } from "react-helmet";
import { useParams } from "react-router";

import { useAuth } from "../../hooks/useAuth";
import ProfileHeader from "../../components/ProfileHeader";
import CreatePostBar from "../../components/Posts/CreatePostBar";
import ContentContainer from "../../components/ContentContainer";
import PostItem from "../../components/Posts/PostItem";
import PagesHeader from "../../components/PagesHeader";
import MainContainer from "../../components/MainContainer";
import { MdContentPasteOff } from "react-icons/md";

function Profile() {
  const { userData } = useAuth();

  const params = useParams();
  return (
    <>
      <Helmet>
        <title>{params.slug} | Novus</title>
      </Helmet>
      <PagesHeader title="Profile" />

      <MainContainer>
        <ProfileHeader userData={userData} />
        <hr className="border-[#4d4d4d]" />

        <CreatePostBar />
        {userData?.data?.user?.posts?.length > 0 ? (
          userData?.data?.user?.posts.map((post) => (
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
    </>
  );
}

export default Profile;
