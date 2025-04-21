import { HiOutlineMenuAlt2 } from "react-icons/hi";

import MainContainer from "../MainContainer";
import MenuButton from "./MenuButton";
import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import DropDownMenuList from "./DropDownMenuList";
import { twMerge } from "tailwind-merge";

function DropdownMenu({ className }) {
  const [showModal, setShowModal] = useState(false);
  const menuRef = useRef(null);

  function toggleShowModleHandler() {
    setShowModal(!showModal);
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowModal(false);
      }
    }

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  return (
    <div ref={menuRef}>
      <MenuButton className="relative" onClick={toggleShowModleHandler}>
        <HiOutlineMenuAlt2 />
      </MenuButton>

      {showModal && (
        <MainContainer className={twMerge("w-40 h-25", className)}>
          <DropDownMenuList />
        </MainContainer>
      )}
    </div>
  );
}

export default DropdownMenu;
