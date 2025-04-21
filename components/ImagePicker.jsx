import { useEffect, useRef, useState } from "react";

function ImagePicker({ name, defaultImage }) {
  const [pickedImage, setPickedImage] = useState(defaultImage || null);
  const [isImageUpdated, setIsImageUpdated] = useState(false);
  const imageInput = useRef();

  useEffect(() => {
    if (!isImageUpdated) {
      setPickedImage(defaultImage || null);
    }
  }, [defaultImage, isImageUpdated]);

  function handlePickClick() {
    imageInput.current.click();
  }

  function handleClearImage(e) {
    e.preventDefault();
    setPickedImage(null);
    setIsImageUpdated(false);
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) {
      setPickedImage(null);
      setIsImageUpdated(false);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
      setIsImageUpdated(true);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className="flex flex-col gap-1">
      <div>
        <div className="group w-[100px] h-[100px] border-[#4c5663] border-2 flex justify-center items-center text-center relative rounded-md">
          {!pickedImage ||
            !isImageUpdated ||
            (defaultImage && (
              <img
                src={defaultImage}
                alt="default image"
                fill
                sizes="max-w-[100px] max-h-[100px]"
                className="object-cover cursor-pointer"
                onClick={handlePickClick}
              />
            ))}

          {pickedImage && (
            <img
              src={pickedImage}
              alt="selected image"
              fill
              sizes="max-w-[100px] max-h-[100px] w-full h-full"
              className="object-cover cursor-pointer"
              onClick={handlePickClick}
            />
          )}
          {pickedImage && isImageUpdated && (
            <button
              onClick={handleClearImage}
              className="absolute z-1000 top-2 right-2 bg-gray-500 text-white font-bold text-sm w-6 h-6 rounded-full flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              X
            </button>
          )}
        </div>
      </div>
      <input
        className="hidden"
        type="file"
        accept="image/*"
        name={name}
        ref={imageInput}
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
