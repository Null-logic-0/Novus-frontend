import { twMerge } from "tailwind-merge";

function MenuButton({ className, children, ...props }) {
  return (
    <button
      {...props}
      className={twMerge(
        "hover:bg-[#171717] p-2 cursor-pointer flex justify-center items-center rounded-lg text-xl max-md:text-xl",
        className
      )}
    >
      {children}
    </button>
  );
}

export default MenuButton;
