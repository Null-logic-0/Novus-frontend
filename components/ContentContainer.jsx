import { twMerge } from "tailwind-merge";

function ContentContainer({ children, className }) {
  return (
    <section
      className={twMerge(
        "h-auto w-full bg-[#171717] border-t md:rounded-b-3xl   border-[#383838] p-4",
        className
      )}
    >
      {children}
    </section>
  );
}

export default ContentContainer;
