import { IoSend } from "react-icons/io5";
import Button from "../UI/Button";
import FormUI from "../UI/FormUI";
import Input from "../UI/Input";
import MainContainer from "../MainContainer";

function CreateComent({ placeholder }) {
  return (
    <div className="border bg-[#000000]  border-[#383838] p-4 rounded-none w-full">
      <FormUI className="w-full">
        <div className="w-full flex items-center relative">
          <Input
            placeholder={`Reply to ${placeholder}...`}
            isTextarea
            name="text"
            className="py-2 pl-5  resize-none border-2  rounded-full h-10 w-full text-white"
          />
          <button
            type="submit"
            className="absolute right-3 cursor-pointer text-white text-lg p-0 opacity-60 hover:opacity-100"
          >
            <IoSend />
          </button>
        </div>
      </FormUI>
    </div>
  );
}

export default CreateComent;
