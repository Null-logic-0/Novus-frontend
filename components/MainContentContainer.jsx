function MainContentContainer({ children }) {
  return (
    <div className="max-md:bg-transparent max-md:border-none max-md:rounded-none flex flex-col gap-2 w-full bg-[#171717] border border-[#383838]  rounded-3xl md:max-w-[640px]">
      {children}
    </div>
  );
}

export default MainContentContainer;
