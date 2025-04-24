import DropdownMenu from "../NavMenu/DropdownMenu";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../src/store/UI-slice";
import Modal from "../UI/Modal";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";

function PostDropdownMenu({ postId }) {
  const dispatch = useDispatch();
  const activeModal = useSelector((state) => state.ui.activeModal);

  const editPostId = `edit-post-${postId}`;
  const deletePostId = `delete-post-${postId}`;

  function openEditPostModalHandler() {
    dispatch(openModal(editPostId));
  }
  function closeEditPostModalHandler() {
    dispatch(closeModal(editPostId));
  }
  function openDeletePostModalHandler() {
    dispatch(openModal(deletePostId));
  }
  function closeDeletePostModalHandler() {
    dispatch(closeModal(deletePostId));
  }

  return (
    <>
      <div className="relative ">
        <DropdownMenu
          icon={<HiDotsHorizontal />}
          modalId={`post-menu-${postId}`}
          className="absolute z-10 right-3 "
        >
          <li>
            <button
              className="flex items-center gap-3 font-semibold cursor-pointer"
              onClick={openEditPostModalHandler}
            >
              <FaRegEdit className="text-lg" />
              Edit Post
            </button>
          </li>
          <li>
            <button
              className="flex text-red-500  items-center gap-3 font-semibold cursor-pointer"
              onClick={openDeletePostModalHandler}
            >
              <RiDeleteBin6Line />
              Delete
            </button>
          </li>
        </DropdownMenu>
      </div>
      {activeModal === editPostId && (
        <Modal onClose={closeEditPostModalHandler}>
          <EditPost onCancel={closeEditPostModalHandler} postId={postId} />
        </Modal>
      )}
      {activeModal === deletePostId && (
        <Modal onClose={closeDeletePostModalHandler}>
          <DeletePost onCancel={closeDeletePostModalHandler} postId={postId} />
        </Modal>
      )}
    </>
  );
}

export default PostDropdownMenu;
