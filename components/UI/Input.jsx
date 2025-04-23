import { twMerge } from "tailwind-merge";

function Input({ isTextarea, className, ...props }) {
  const Component = isTextarea ? "textarea" : "input";

  return (
    <Component
      {...props}
      className={twMerge(
        "bg-[#1f1f1f]  p-4 focus:border w-full  placeholder:text-[#787878] text-white border rounded-xl focus:border-white border-[#333333] focus:outline-none selection:bg-transparent",
        className
      )}
    />
  );
}

export default Input;
