import { useLocation } from "react-router";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { useDispatch, useSelector } from "react-redux";

import MainContainer from "../MainContainer";
import MenuButton from "./MenuButton";
import { closeModal, openModal } from "../../src/store/UI-slice";

function DropdownMenu({ className, children, icon, modalId }) {
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const activeModal = useSelector((state) => state.ui.activeModal);
  const location = useLocation();

  const openDropdownMenuHandler = () => {
    dispatch(openModal(modalId));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        dispatch(closeModal(modalId));
      }
    };

    if (activeModal === modalId) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch, modalId, activeModal]);

  useEffect(() => {
    dispatch(closeModal(modalId));
  }, [location, modalId, dispatch]);

  return (
    <div ref={menuRef}>
      <MenuButton
        className=" text-lg opacity-50 hover:opacity-100"
        onClick={openDropdownMenuHandler}
      >
        {icon}
      </MenuButton>

      {activeModal === modalId && (
        <MainContainer className={twMerge("w-40 h-25", className)}>
          <ul className="flex flex-col gap-4 px-6 py-4">{children}</ul>
        </MainContainer>
      )}
    </div>
  );
}
export default DropdownMenu;
