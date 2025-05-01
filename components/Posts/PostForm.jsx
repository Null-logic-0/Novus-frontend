import { useRef, useState } from "react";
import { PiImagesFill } from "react-icons/pi";

import Button from "../UI/Button";
import MediaFilesPreview from "./MediaFilesPreview";

function PostForm({ onCancel, onSubmit, isPending }) {
  const fileInputRef = useRef(null);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [caption, setCaption] = useState("");

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
    <form
      className="flex flex-col items-start w-full gap-4"
      onSubmit={onSubmit}
    >
      <textarea
        name="caption"
        rows={4}
        placeholder="What's new?"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
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
        {(caption.trim() || mediaFiles.length > 0) && !isPending && (
          <>
            <Button
              type="button"
              className="border-2 border-[#333333] max-w-30 text-white bg-[#171717] p-2"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button className="bg-white max-w-30 p-2">Post</Button>
          </>
        )}
        {isPending && (
          <p className="opacity-50 font-semibold text-white">
            Please wait,Post is creating...
          </p>
        )}
      </div>
    </form>
  );
}

export default PostForm;
