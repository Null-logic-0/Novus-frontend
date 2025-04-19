function ContentContainer({ children }) {
  return (
    <section className="h-auto w-full md:bg-[#171717] border-t rounded-b-3xl  border-[#383838] p-4">
      {children}
    </section>
  );
}

export default ContentContainer;
