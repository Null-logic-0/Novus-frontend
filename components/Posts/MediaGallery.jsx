import { useRef, useState } from "react";
import { VscUnmute, VscMute } from "react-icons/vsc";
import { Link } from "react-router";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

function MediaGallery({ media, link, className, mediaStyle }) {
  const containerRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const safeMedia = Array.isArray(media) ? media : [];

  const images = safeMedia
    .filter(
      (file) => typeof file === "string" && file.match(/\.(jpg|png|jpeg)$/i)
    )
    .map((image) => ({
      id: uuidv4(),
      src: image,
    }));

  const videos = safeMedia
    .filter(
      (file) =>
        typeof file === "string" &&
        (file.match(/\.(mp4|mov)$/i) || file.startsWith("blob:"))
    )
    .map((video) => ({
      id: uuidv4(),
      src: video,
    }));

  return (
    <div ref={containerRef} className={className}>
      {/* Videos */}
      {videos.map((video) => (
        <div key={`video-${video.id}`} className="relative">
          <button
            type="button"
            onClick={() => setMuted((prev) => !prev)}
            className="absolute z-50 right-0 bottom-2 text-xl text-white px-3 py-1 rounded-md cursor-pointer"
          >
            {muted ? <VscMute /> : <VscUnmute />}
          </button>
          <Link to={link}>
            <video
              className={twMerge(
                "rounded-xl w-80 h-full max-md:w-50 object-cover",
                mediaStyle
              )}
              src={video.src}
              style={{ maxWidth: "none" }}
              autoPlay
              loop
              muted={muted}
              playsInline
            />
          </Link>
        </div>
      ))}

      {images.map((image) => (
        <Link to={link} key={`image-${image.id}`}>
          <img
            src={image.src}
            alt={`media-${image.src}`}
            style={{ maxWidth: "none" }}
            className={twMerge(
              "rounded-xl w-80 h-full max-md:w-50 object-cover",
              mediaStyle
            )}
          />
        </Link>
      ))}
    </div>
  );
}

export default MediaGallery;
