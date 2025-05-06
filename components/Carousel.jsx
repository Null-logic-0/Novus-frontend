import { useState } from "react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { VscUnmute, VscMute } from "react-icons/vsc";
import { v4 as uuidv4 } from "uuid";

function Carousel({ media }) {
  const [muted, setMuted] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const safeMedia = Array.isArray(media) ? media : [];

  const images = safeMedia
    .filter(
      (file) => typeof file === "string" && file.match(/\.(jpg|png|jpeg)$/i)
    )
    .map((image) => ({
      id: uuidv4(),
      src: image,
      type: "image",
    }));

  const videos = safeMedia
    .filter(
      (file) =>
        typeof file === "string" &&
        (file.match(/\.(mp4)$/i) || file.startsWith("blob:"))
    )
    .map((video) => ({
      id: uuidv4(),
      src: video,
      type: "video",
    }));

  const allMedia = [...videos, ...images];

  const currentMedia = allMedia[currentIndex];

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? allMedia.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allMedia.length);
  };

  if (allMedia.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen text-center text-gray-500">
        <p>No media available to display.</p>
      </div>
    );
  }

  return (
    <div className="relative h-screen flex items-center justify-center p-6">
      {allMedia.length > 1 && (
        <button
          onClick={goPrev}
          className={`absolute left-2  z-10 text-white bg-[#1f1f1f] max-md:text-sm max-md:p-2 rounded-full p-4 ${
            currentIndex === 0 ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={currentIndex === 0}
        >
          <GrLinkPrevious />
        </button>
      )}

      {currentMedia?.type === "video" ? (
        <div key={currentMedia.id} className="relative">
          <button
            type="button"
            onClick={() => setMuted((prev) => !prev)}
            className="absolute z-50 right-0  bottom-2 max-md:text-sm max-md:p-2 text-xl text-white px-3 py-1 rounded-md cursor-pointer"
          >
            {muted ? <VscMute /> : <VscUnmute />}
          </button>
          <video
            src={currentMedia.src}
            autoPlay
            loop
            muted={muted}
            playsInline
            className="rounded-xl w-[450px] max-md:w-80 h-full object-cover"
          />
        </div>
      ) : (
        <img
          key={currentMedia.id}
          src={currentMedia.src}
          alt={`media-${currentMedia.id}`}
          className="rounded-xl max-w-[600px]  max-md:w-80 h-full object-cover max-md:object-contain"
          style={{ maxWidth: "none" }}
        />
      )}

      {allMedia.length > 1 && (
        <button
          onClick={goNext}
          className={`absolute right-2 z-10 text-white max-md:text-sm max-md:p-2 bg-[#1f1f1f] rounded-full p-4 ${
            currentIndex === allMedia.length - 1
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }`}
          disabled={currentIndex === allMedia.length - 1}
        >
          <GrLinkNext />
        </button>
      )}
    </div>
  );
}

export default Carousel;
