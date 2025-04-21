import { useRef } from "react";
import ProfileAvatar from "./ProfileAvatar";
import Button from "./UI/Button";
import { PiImagesFill } from "react-icons/pi";

function CreatePost() {
  const fileInputRef = useRef(null);

  function handleFileUploadClick() {
    fileInputRef.current?.click();
  }

  return (
    <div className="flex items-start gap-4">
      <ProfileAvatar alt="user" />
      <div className="flex flex-col gap-2 w-full">
        <p className="text-sm font-semibold">User Name</p>

        <form className="flex flex-col items-start w-full   gap-6 ">
          <textarea
            name="caption"
            placeholder="whats'new?"
            className="w-full resize-none outline-none"
          />

          <input
            type="file"
            name="media"
            multiple
            hidden
            ref={fileInputRef}
            accept="image/*,video/*"
          />

          <button
            type="button"
            onClick={handleFileUploadClick}
            className="text-2xl cursor-pointer"
          >
            <PiImagesFill />
          </button>

          <div className="flex gap-2 justify-end items-center w-full ">
            <Button
              type="button"
              className="border-2 border-[#333333] max-w-30 text-white bg-[#171717]  p-2"
            >
              Cancle
            </Button>
            <Button className="bg-white max-w-30  p-2">Post</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
