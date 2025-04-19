import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (typeof dialog.showModal === "function" && !dialog.open) {
      dialog.showModal();
    }

    const handleBackdropClick = (e) => {
      if (e.target === dialog) onClose?.();
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    dialog.addEventListener("click", handleBackdropClick);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      dialog.close();
      dialog.removeEventListener("click", handleBackdropClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <dialog ref={dialogRef} className="modal">
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
