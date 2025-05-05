import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import { closeModal, openModal } from "../../store/UI-slice";

import { AiFillHome } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { RiMessage3Fill, RiMessage3Line, RiSearch2Fill } from "react-icons/ri";
import { RiSearch2Line } from "react-icons/ri";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { RiUser3Fill } from "react-icons/ri";
import { RiUser3Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";

import MenuButton from "./MenuButton";
import NavItem from "./NavItem";
import Modal from "../UI/Modal";
import CreatePost from "../Posts/CreatePost";

function NavMenuList() {
  const { userData } = useAuth();
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.ui.activeModal);

  const openModalHandler = () => {
    dispatch(openModal("createPost"));
  };

  const closeModalHandler = () => {
    dispatch(closeModal("createPost"));
  };
  return (
    <>
      <ul className="flex flex-col items-center h-full justify-center xl:gap-7 max-md:flex-row max-md:justify-between  max-md:w-full">
        <NavItem
          link="/"
          additionalActiveLinks={["/followings", "/liked"]}
          active={<AiFillHome />}
          unActive={<AiOutlineHome />}
        />
        <NavItem
          link="/direct"
          active={<RiMessage3Fill />}
          unActive={<RiMessage3Line />}
        />
        <NavItem
          link="/search"
          active={<RiSearch2Fill />}
          unActive={<RiSearch2Line />}
        />
        <MenuButton onClick={openModalHandler}>
          <FaPlus />
        </MenuButton>
        <NavItem
          link="/activity"
          active={<GoHeartFill />}
          unActive={<GoHeart />}
        />
        <NavItem
          link={`/${userData?.data.user._id}`}
          active={<RiUser3Fill />}
          unActive={<RiUser3Line />}
        />
      </ul>
      {showModal === "createPost" && (
        <Modal onClose={closeModalHandler}>
          <CreatePost onCancel={closeModalHandler} />
        </Modal>
      )}
    </>
  );
}

export default NavMenuList;
