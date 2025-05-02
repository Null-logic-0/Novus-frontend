import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../src/store/UI-slice";

import DropdownMenu from "./NavMenu/DropdownMenu";
import Modal from "./UI/Modal";

import { FaChevronDown, FaUserLock } from "react-icons/fa";
import BlockUser from "./BlockUser";

function ProfileDropdownMenu({ userId, userName }) {
  const dispatch = useDispatch();
  const activeModal = useSelector((state) => state.ui.activeModal);

  const blockUser = `block-${userId}`;

  function openBlockUserModalHandler() {
    dispatch(openModal(blockUser));
  }
  function closeBlockUserModalHandler() {
    dispatch(closeModal(blockUser));
  }

  return (
    <>
      <div className="relative ">
        <DropdownMenu
          icon={<FaChevronDown />}
          modalId={`profile-menu-${userId}`}
          className="absolute z-10 left-1 h-15 rounded-xl"
        >
          <li>
            <button
              className="flex text-red-500  items-center gap-3 font-semibold cursor-pointer"
              onClick={openBlockUserModalHandler}
            >
              <FaUserLock />
              Block user
            </button>
          </li>
        </DropdownMenu>
      </div>

      {activeModal === blockUser && (
        <Modal onClose={closeBlockUserModalHandler}>
          <BlockUser
            userId={userId}
            onCancel={closeBlockUserModalHandler}
            userName={userName}
          />
        </Modal>
      )}
    </>
  );
}

export default ProfileDropdownMenu;
