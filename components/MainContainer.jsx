import { twMerge } from "tailwind-merge";

function MainContainer({ children, className }) {
  return (
    <div
      className={twMerge(
        "max-md:bg-transparent max-md:border-none max-md:rounded-none flex flex-col gap-2 w-full bg-[#171717] border border-[#383838]  rounded-3xl md:max-w-[640px]",
        className
      )}
    >
      {children}
    </div>
  );
}

export default MainContainer;
