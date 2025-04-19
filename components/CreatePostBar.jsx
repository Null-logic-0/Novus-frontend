import Button from "./UI/Button";
import Input from "./UI/Input";
import ProfileAvatar from "./ProfileAvatar";
import Modal from "./UI/Modal";
import { useState } from "react";

function CreatePostBar() {
  const [createPost, setCreatePost] = useState(false);

  function handleCreatePost() {
    setCreatePost(true);
  }

  function handleClosePost() {
    setCreatePost(false);
  }

  return (
    <>
      <div className="flex items-center justify-between p-4 max-md:hidden">
        <div className="flex items-center w-full">
          <ProfileAvatar link="user" alt={"user"} />
          <Input
            className="bg-transparent border-none w-full"
            placeholder="What's new ?"
            readOnly
            onClick={handleCreatePost}
          />
        </div>
        <Button
          className="border-2 border-[#333333] text-white bg-[#171717] max-w-16 p-2"
          onClick={handleCreatePost}
        >
          Post
        </Button>
      </div>

      {createPost && (
        <Modal onClose={handleClosePost}>
          <h1>hello</h1>
          <button onClick={handleClosePost}>Close</button>
        </Modal>
      )}
    </>
  );
}

export default CreatePostBar;
