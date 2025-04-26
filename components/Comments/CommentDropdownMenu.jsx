import DropdownMenu from "../NavMenu/DropdownMenu";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../src/store/UI-slice";
import Modal from "../UI/Modal";
import DeleteComment from "./DeleteComment";
import EditComment from "./EditComment";

function CommentDropdownMenu({ commentId }) {
  const dispatch = useDispatch();
  const activeModal = useSelector((state) => state.ui.activeModal);

  const editCommentId = `edit-post-${commentId}`;
  const deleteCommentId = `delete-post-${commentId}`;

  function openEditCommentModalHandler() {
    dispatch(openModal(editCommentId));
  }
  function closeEditCommentModalHandler() {
    dispatch(closeModal(editCommentId));
  }
  function openDeleteCommentModalHandler() {
    dispatch(openModal(deleteCommentId));
  }
  function closeDeleteCommentModalHandler() {
    dispatch(closeModal(deleteCommentId));
  }

  return (
    <>
      <div className="relative ">
        <DropdownMenu
          icon={<HiDotsHorizontal />}
          modalId={`comment-menu-${commentId}`}
          className="absolute   z-10 right-1 "
        >
          <li>
            <button
              className="flex items-center gap-3 font-semibold cursor-pointer"
              onClick={openEditCommentModalHandler}
            >
              <FaRegEdit className="text-lg" />
              Edit
            </button>
          </li>
          <li>
            <button
              className="flex text-red-500  items-center gap-3 font-semibold cursor-pointer"
              onClick={openDeleteCommentModalHandler}
            >
              <RiDeleteBin6Line />
              Delete
            </button>
          </li>
        </DropdownMenu>
      </div>
      {activeModal === editCommentId && (
        <Modal onClose={closeEditCommentModalHandler}>
          <EditComment
            onCancel={closeEditCommentModalHandler}
            commentId={commentId}
          />
        </Modal>
      )}
      {activeModal === deleteCommentId && (
        <Modal onClose={closeDeleteCommentModalHandler}>
          <DeleteComment
            commentId={commentId}
            onCancel={closeDeleteCommentModalHandler}
          />
        </Modal>
      )}
    </>
  );
}

export default CommentDropdownMenu;
