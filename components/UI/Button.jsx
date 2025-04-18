import { twMerge } from "tailwind-merge";

function Button({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={twMerge(
        " rounded-xl w-full font-semibold cursor-pointer text-sm p-4 text-[#0f0f0f]",
        className
      )}
    >
      {children}
    </button>
  );
}

export default Button;
