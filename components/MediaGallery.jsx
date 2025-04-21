import { useEffect, useRef, useState } from "react";
import { VscUnmute, VscMute } from "react-icons/vsc";

function MediaGallery({ media }) {
  const containerRef = useRef(null);
  const [minHeight, setMinHeight] = useState(null);
  const [muted, setMuted] = useState(true);

  const images = media.filter(
    (file) => typeof file === "string" && file.match(/\.(jpg|png|jpeg)$/i)
  );

  const videos = media.filter(
    (file) =>
      typeof file === "string" &&
      (file.match(/\.(mp4|mov)$/i) || file.startsWith("blob:"))
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = Array.from(
      containerRef.current.querySelectorAll("video, img")
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
    <div
      ref={containerRef}
      className="overflow-x-scroll pt-2 max-w-[630px] max-md:max-w-[300px] max-md:pr-4 flex  items-start gap-2 pr-6 scrollbar-hide"
    >
      {/* Videos */}
      {videos.map((file) => (
        <div key={`video-${file.id}`} className="relative ">
          <button
            type="button"
            onClick={() => setMuted((prev) => !prev)}
            className="absolute z-10 right-0 bottom-2 text-xl text-white px-3 py-1 rounded-md cursor-pointer"
          >
            {muted ? <VscMute /> : <VscUnmute />}
          </button>
          <video
            src={file}
            className="rounded-xl w-80 max-md:w-50  object-cover"
            style={{ maxWidth: "none", maxHeight: minHeight }}
            autoPlay
            loop
            muted={muted}
            playsInline
          />
        </div>
      ))}

      {/* Images */}
      {images.map((file) => (
        <img
          key={`image-${file.id}`}
          src={file}
          alt={`media-${file.id}`}
          className="rounded-xl w-80 max-md:w-50 object-cover"
          style={{ height: minHeight || "auto" }}
        />
      ))}
    </div>
  );
}

export default MediaGallery;
