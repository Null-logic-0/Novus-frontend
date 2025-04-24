import ContentContainer from "../ContentContainer";
import PostActions from "../Posts/PostActions";
import ProfileAvatar from "../ProfileAvatar";

function Comments() {
  return (
    <ContentContainer className="flex items-start gap-3">
      <ProfileAvatar alt={`-profile avatar`} />
      <div className="flex flex-col gap-2">
        <p>userName</p>
        <p>text</p>
        <PostActions />
      </div>
    </ContentContainer>
  );
}

export default Comments;
