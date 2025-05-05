import FormUI from "../UI/FormUI";
import Input from "../UI/Input";
import { IoSend } from "react-icons/io5";
import { FiPlusCircle } from "react-icons/fi";
import MediaFilesPreview from "../Posts/MediaFilesPreview";

function SendMessageForm({
  handleSubmit,
  caption,
  setCaption,
  isPending,
  mediaFiles,
  setMediaFiles,
  fileInputRef,
}) {
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
    <FormUI
      className="bg-[#17191C] p-2 z-10 absolute bottom-0"
      onSubmit={handleSubmit}
    >
      <input
        type="file"
        multiple
        name="media"
        hidden
        ref={fileInputRef}
        accept="image/*,video/*"
        onChange={handleFileChange}
      />
      <div className="flex flex-col items-center gap-2 w-full">
        <MediaFilesPreview
          mediaFiles={mediaFiles}
          handleRemoveFile={handleRemoveFile}
        />
        <div className="flex gap-[8px] w-full items-center">
          <button
            className="cursor-pointer"
            type="button"
            onClick={handleFileUploadClick}
          >
            <FiPlusCircle className="text-[#747881] text-3xl" />
          </button>
          <Input
            placeholder="Send a message..."
            isTextarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            name="content"
            className="py-[4px] pl-[16px] resize-none border-2 bg-[#17191C] border-[#272A30] rounded-full h-10 text-white"
          />
          {(caption.trim() || mediaFiles.length > 0) && !isPending && (
            <button
              type="submit"
              className="bg-[#4C525C] cursor-pointer text-white text-xl p-[8px] rounded-full"
            >
              <IoSend />
            </button>
          )}
        </div>
      </div>
    </FormUI>
  );
}

export default SendMessageForm;
