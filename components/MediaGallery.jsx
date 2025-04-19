import { useEffect, useRef, useState } from "react";
import { VscUnmute, VscMute } from "react-icons/vsc";

function MediaGallery({ media }) {
  const containerRef = useRef(null);
  const [minHeight, setMinHeight] = useState(null);
  const [muted, setMuted] = useState(true);
  const [hasVideo, setHasVideo] = useState(false);

  useEffect(() => {
    const videoExists = media.some((file) => file.match(/\.(mp4|mov)$/i));
    setHasVideo(videoExists);
  }, [media]);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = Array.from(
      containerRef.current.querySelectorAll("img, video")
    );

    const checkHeights = () => {
      const heights = elements.map((el) => el.offsetHeight);
      const shortest = Math.min(...heights);
      setMinHeight(shortest);
    };

    const handleLoaded = () => {
      setTimeout(checkHeights, 100);
    };

    elements.forEach((el) => {
      if (el.tagName === "IMG") {
        el.addEventListener("load", handleLoaded);
      } else {
        el.addEventListener("loadeddata", handleLoaded);
      }
    });

    return () => {
      elements.forEach((el) => {
        if (el.tagName === "IMG") {
          el.removeEventListener("load", handleLoaded);
        } else {
          el.removeEventListener("loadeddata", handleLoaded);
        }
      });
    };
  }, [media]);

  return (
    <div className="relative">
      {/* Mute/Unmute Button (only if video exists) */}
      {hasVideo && (
        <button
          onClick={() => setMuted((prev) => !prev)}
          className="absolute z-10 right-5 bottom-2 text-xl text-white px-3 py-1 rounded-md cursor-pointer"
        >
          {muted ? <VscMute /> : <VscUnmute />}
        </button>
      )}

      {/* Media Display */}
      <div
        ref={containerRef}
        className="overflow-x-scroll pt-2 max-w-[600px] flex items-start gap-2 pr-6 scrollbar-hide"
      >
        {media.map((file, index) =>
          file.match(/\.(mp4|mov)$/i) ? (
            <video
              key={index}
              src={file}
              className="rounded-xl w-80 object-cover"
              style={{ height: minHeight || "auto" }}
              autoPlay
              loop
              muted={muted}
              playsInline
            />
          ) : (
            <img
              key={index}
              src={file}
              alt={`media-${index}`}
              className="rounded-xl w-80 object-cover"
              style={{ height: minHeight || "auto" }}
            />
          )
        )}
      </div>
    </div>
  );
}

export default MediaGallery;
