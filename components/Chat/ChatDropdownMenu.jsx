import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../store/UI-slice";

import { RxDotsHorizontal } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";

import DropdownMenu from "../NavMenu/DropdownMenu";
import Modal from "../UI/Modal";
import DeleteChat from "./DeleteChat";

function ChatDropdownMenu({ chatId }) {
  const dispatch = useDispatch();
  const activeModal = useSelector((state) => state.ui.activeModal);

  const deleteChatId = `delete-chat-${chatId}`;

  function openDeleteChatModalHandler() {
    dispatch(openModal(deleteChatId));
  }
  function closeDeleteChatModalHandler() {
    dispatch(closeModal(deleteChatId));
  }

  return (
    <>
      <div className="relative z-10">
        <DropdownMenu
          icon={<RxDotsHorizontal />}
          modalId={`chat-menu-${chatId}`}
          className="absolute h-15 rounded-xl bg-[#080707]  border-[#272A30] border-2  z-10 right-1 "
        >
          <li>
            <button
              className="flex text-red-500  items-center gap-3 font-semibold cursor-pointer"
              onClick={openDeleteChatModalHandler}
            >
              <RiDeleteBin6Line />
              Delete
            </button>
          </li>
        </DropdownMenu>
      </div>

      {activeModal === deleteChatId && (
        <Modal onClose={closeDeleteChatModalHandler}>
          <DeleteChat onCancel={closeDeleteChatModalHandler} chatId={chatId} />
        </Modal>
      )}
    </>
  );
}

export default ChatDropdownMenu;
