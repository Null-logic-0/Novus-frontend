function MessageList({ children, isSender }) {
  return (
    <li
      className={`${
        isSender
          ? "bg-[#001A3D] rounded-r-2xl rounded-br-none rounded-l-2xl"
          : "bg-[#1C1E22] rounded-l-2xl rounded-bl-none rounded-r-2xl"
      }    text-[14px] text-[#fff] px-[16px] py-[8px]   w-full`}
    >
      {children}
    </li>
  );
}

export default MessageList;
