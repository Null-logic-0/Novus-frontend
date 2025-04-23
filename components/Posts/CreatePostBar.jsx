import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../src/store/UI-slice";
import { useAuth } from "../../hooks/useAuth";

import Button from "../UI/Button";
import Input from "../UI/Input";
import ProfileAvatar from "../ProfileAvatar";
import Modal from "../UI/Modal";
import CreatePost from "./CreatePost";

function CreatePostBar() {
  const { userData } = useAuth();

  const showModal = useSelector((state) => state.ui.activeModal);
  const dispatch = useDispatch();

  const openModalHandler = () => {
    dispatch(openModal("createPost"));
  };
  const closeModalHandler = () => {
    dispatch(closeModal("createPost"));
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 max-md:hidden">
        <div className="flex items-center w-full">
          <ProfileAvatar
            link="user"
            alt={`${userData?.data?.user?.fullName}-avatar`}
            img={userData?.data?.user?.profileImage}
          />
          <Input
            className="bg-transparent border-none w-full"
            placeholder="What's new ?"
            readOnly
            onClick={openModalHandler}
          />
        </div>
        <Button
          className="border-2 border-[#333333] text-white bg-[#171717] max-w-16 p-2"
          onClick={openModalHandler}
        >
          Post
        </Button>
      </div>

      {showModal === "createPost" && (
        <Modal onClose={closeModalHandler}>
          <CreatePost onCancel={closeModalHandler} />
        </Modal>
      )}
    </>
  );
}

export default CreatePostBar;
