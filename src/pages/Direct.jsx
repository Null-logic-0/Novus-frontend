import Empty from "../../components/Chat/ChatIsEmpty";

function Direct() {
  return (
    <div className="flex max-md:hidden justify-center w-full  items-center">
      <Empty text="No chats here yet..." />
    </div>
  );
}

export default Direct;
