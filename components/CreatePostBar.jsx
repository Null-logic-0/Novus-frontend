import { Link } from "react-router";
import Button from "./UI/Button";
import Input from "./UI/Input";

function CreatePostBar() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center w-full">
        <Link to="user">
          <img
            src="../src/assets/default.jpg"
            alt="user-name"
            className="object-fill w-10 h-10 rounded-full"
          />
        </Link>
        <Input
          className="bg-transparent border-none w-full"
          placeholder="What's new ?"
          readOnly
        />
      </div>
      <Button className="border-2 border-[#333333] text-white bg-[#171717] max-w-16 p-2">
        Post
      </Button>
    </div>
  );
}

export default CreatePostBar;
