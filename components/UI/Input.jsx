import { twMerge } from "tailwind-merge";

function Input({ className, ...props }) {
  return (
    <input
      {...props}
      className={twMerge(
        "bg-[#1f1f1f]  p-4 focus:border w-full  placeholder:text-[#787878] text-white rounded-xl focus:border-[#333333] focus:outline-none ",
        className
      )}
    />
  );
}

export default Input;
