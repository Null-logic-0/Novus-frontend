import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../util/http";
import { clearAuth } from "../../src/store/authSlice";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogout() {
    try {
      await logout();
      dispatch(clearAuth());
      navigate("/login");
    } catch (error) {
      console.error("Logout Failed", error);
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="text-red-500 font-bold cursor-pointer"
    >
      Log Out
    </button>
  );
}

export default Logout;
