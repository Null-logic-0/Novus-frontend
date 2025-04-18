function Container({ children }) {
  return (
    <div className="h-full w-full bg-[#171717] border border-[#383838] p-4 rounded-3xl max-w-[640px]">
      {children}
    </div>
  );
}

export default Container;
