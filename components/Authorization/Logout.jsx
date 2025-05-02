import { useAuth } from "../../hooks/useAuth";

function Logout() {
  const { logout } = useAuth();

  function handleLogout() {
    logout();
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
