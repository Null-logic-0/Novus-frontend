import { Navigate } from "react-router";
import { useSelector } from "react-redux";

function ProtectRoutes({ children }) {
  const token = useSelector((state) => state.auth.token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectRoutes;
