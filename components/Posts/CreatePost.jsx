import { useRef, useState } from "react";

import ProfileAvatar from "../ProfileAvatar";
import Button from "../UI/Button";
import { PiImagesFill } from "react-icons/pi";
import MediaFilesPreview from "./MediaFilesPreview";

function CreatePost({ onCancel }) {
  const fileInputRef = useRef(null);
  const [mediaFiles, setMediaFiles] = useState([]);

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setMediaFiles((prev) => [...prev, ...previews]);
  };

  const handleRemoveFile = (index) => {
    setMediaFiles((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].url);
      updated.splice(index, 1);
      return updated;
    });
  };

  return (
    <div className="flex items-start gap-4">
      <ProfileAvatar alt="user" />
      <div className="flex flex-col gap-2 w-full">
        <p className="text-sm font-semibold text-white">User Name</p>

        <form className="flex flex-col items-start w-full gap-4">
          <textarea
            name="caption"
            placeholder="What's new?"
            className="w-full resize-none outline-none text-white bg-transparent"
          />

          <input
            type="file"
            multiple
            name="media"
            hidden
            ref={fileInputRef}
            accept="image/*,video/*"
            onChange={handleFileChange}
          />

          <MediaFilesPreview
            mediaFiles={mediaFiles}
            handleRemoveFile={handleRemoveFile}
          />

          <button
            type="button"
            onClick={handleFileUploadClick}
            className="text-2xl cursor-pointer text-white"
          >
            <PiImagesFill />
          </button>

          <div className="flex gap-2 justify-end items-center w-full mt-2">
            <Button
              type="button"
              className="border-2 border-[#333333] max-w-30 text-white bg-[#171717] p-2"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button className="bg-white max-w-30 p-2">Post</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
