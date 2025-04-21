import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../src/store/UI-slice";

import Button from "../UI/Button";
import Input from "../UI/Input";
import ProfileAvatar from "../ProfileAvatar";
import Modal from "../UI/Modal";
import CreatePost from "./CreatePost";

function CreatePostBar() {
  const showModal = useSelector((state) => state.ui.modalIsVisible);
  const dispatch = useDispatch();

  const toggleModalHandler = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 max-md:hidden">
        <div className="flex items-center w-full">
          <ProfileAvatar link="user" alt={"user"} />
          <Input
            className="bg-transparent border-none w-full"
            placeholder="What's new ?"
            readOnly
            onClick={toggleModalHandler}
          />
        </div>
        <Button
          className="border-2 border-[#333333] text-white bg-[#171717] max-w-16 p-2"
          onClick={toggleModalHandler}
        >
          Post
        </Button>
      </div>

      {showModal && (
        <Modal onClose={toggleModalHandler}>
          <CreatePost onCancel={toggleModalHandler} />
        </Modal>
      )}
    </>
  );
}

export default CreatePostBar;
