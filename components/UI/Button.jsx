import { twMerge } from "tailwind-merge";

function Button({ disabled, children, className, ...props }) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={twMerge(
        ` rounded-xl w-full font-semibold cursor-pointer text-sm p-4 text-[#0f0f0f] ${
          disabled ? "cursor-not-allowed" : undefined
        }`,
        className
      )}
    >
      {children}
    </button>
  );
}

export default Button;
