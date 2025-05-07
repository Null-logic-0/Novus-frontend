import { io } from "socket.io-client";

let socket = null;

const URL =
  import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_LOCAL_URL;

export const initSocket = (token) => {
  if (!token || typeof token !== "string" || token.trim() === "") {
    console.warn("Invalid token passed to initSocket:", token);
    return null;
  }

  if (!socket) {
    socket = io(URL, {
      withCredentials: true,
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
      console.log("✅ Connected to socket server");
    });

    socket.on("disconnect", (reason) => {
      console.warn("⚠️ Socket disconnected:", reason);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err.message);
    });
  }

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    console.log("🔌 Socket disconnected manually");
    socket = null;
  }
};
