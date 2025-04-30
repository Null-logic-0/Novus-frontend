import { useEffect } from "react";
import { disconnectSocket, initSocket } from "../lib/socket";
import { usePostSocketEvents } from "../hooks/usePostSocket";
import { useAuth } from "../hooks/useAuth";

function AppShell({ children }) {
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      initSocket(token);
    }

    return () => {
      disconnectSocket();
    };
  }, [token]);

  usePostSocketEvents();

  return <>{children}</>;
}

export default AppShell;
