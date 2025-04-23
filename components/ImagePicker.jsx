import { useEffect, useRef, useState } from "react";

function ImagePicker({ name, defaultImage }) {
  const [pickedImage, setPickedImage] = useState(defaultImage || null);
  const [isImageUpdated, setIsImageUpdated] = useState(false);
  const imageInputRef = useRef();

  useEffect(() => {
    if (!isImageUpdated) {
      setPickedImage(defaultImage || null);
    }
  }, [defaultImage, isImageUpdated]);

  const handlePickClick = () => {
    imageInputRef.current.click();
  };

  const handleClearImage = (e) => {
    e.preventDefault();
    setPickedImage(null);
    setIsImageUpdated(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPickedImage(fileReader.result);
        setIsImageUpdated(true);
      };
      fileReader.readAsDataURL(file);
    } else {
      setPickedImage(null);
      setIsImageUpdated(false);
    }
  };

  const imageSrc = pickedImage || defaultImage;
  const showClearButton = pickedImage && isImageUpdated;

  return (
    <div className="flex flex-col gap-1">
      <div className="group w-25 rounded-full h-25 relative">
        <img
          src={imageSrc || ""}
          alt={imageSrc ? "selected image" : "default image"}
          className="object-cover cursor-pointer rounded-full w-25 h-25"
          onClick={handlePickClick}
        />

        {showClearButton && (
          <button
            onClick={handleClearImage}
            className="absolute z-1000 top-2 right-2 bg-gray-500 text-white font-bold cursor-pointer text-sm w-6 h-6 rounded-full flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            X
          </button>
        )}
      </div>

      <input
        className="hidden"
        type="file"
        accept="image/*"
        name={name}
        ref={imageInputRef}
        onChange={handleImageChange}
      />

      <input
        type="hidden"
        name={name}
        value={pickedImage || defaultImage || ""}
      />
    </div>
  );
}

export default ImagePicker;
