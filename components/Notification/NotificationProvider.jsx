import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { getSocket } from "../../lib/socket";

function NotificationProvider({ children }) {
  const { userData } = useAuth();

  const currentUserId = userData?.data?.user._id;
  const socket = getSocket();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (data) => {
      if (data?.sender && data?.sender._id === currentUserId) return;

      toast.info("You received a new message", {
        position: "top-right",
        autoClose: 5000,
      });
    };

    socket.on("new-message", handleNewMessage);

    return () => {
      socket.off("new-message", handleNewMessage);
    };
  }, [socket, currentUserId]);

  return (
    <>
      <ToastContainer
        toastStyle={{
          backgroundColor: "#17191C",
          color: "#fff",
          borderRadius: "12px",
          padding: "10px 16px",
          boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
        }}
      />
      {children}
    </>
  );
}

export default NotificationProvider;
