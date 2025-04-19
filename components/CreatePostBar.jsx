import Button from "./UI/Button";
import Input from "./UI/Input";
import ProfileAvatar from "./ProfileAvatar";

function CreatePostBar() {
  return (
    <div className="flex items-center  justify-between p-4 max-md:hidden">
      <div className="flex items-center w-full">
        <ProfileAvatar link="user" alt={"user"} />
        <Input
          className="bg-transparent border-none w-full"
          placeholder="What's new ?"
          readOnly
        />
      </div>
      <Button className="border-2 border-[#333333] text-white bg-[#171717] max-w-16 p-2">
        Post
      </Button>
    </div>
  );
}

export default CreatePostBar;
