import { IoSend } from "react-icons/io5";
import FormUI from "../UI/FormUI";
import Input from "../UI/Input";

function CommentForm({ placeholder, onSubmit }) {
  return (
    <FormUI className="w-full" onSubmit={onSubmit}>
      <div className="w-full flex items-center relative">
        <Input
          placeholder={placeholder}
          isTextarea
          name="text"
          className="py-2 pl-5 resize-none border-2 max-md:text-sm rounded-full h-10 w-full text-white"
        />
        <button
          type="submit"
          className="absolute right-3 cursor-pointer text-white text-lg p-0 opacity-60 hover:opacity-100"
        >
          <IoSend />
        </button>
      </div>
    </FormUI>
  );
}

export default CommentForm;
