import { IoMdCloseCircle } from "react-icons/io";

function MediaFilesPreview({ mediaFiles, handleRemoveFile }) {
  return (
    <>
      {mediaFiles.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {mediaFiles.map((item, index) => (
            <div className="relative" key={index}>
              {item.file.type.startsWith("image") ? (
                <img
                  src={item.url}
                  alt="preview"
                  className="w-30 h-30 rounded-md object-cover"
                />
              ) : (
                <video
                  src={item.url}
                  className="w-30 h-30 rounded-md object-cover"
                  autoPlay
                  muted
                  loop
                />
              )}

              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                className="absolute -top-1 -right-1 text-white bg-black/70 rounded-full cursor-pointer"
              >
                <IoMdCloseCircle size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default MediaFilesPreview;
