import { useNavigate } from "react-router";
import Button from "./Button";

function NavigationButton({ children, link }) {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate(link);
  }

  return (
    <Button
      className="border-2 border-[#333333] text-white "
      onClick={handleNavigate}
    >
      {children}
    </Button>
  );
}

export default NavigationButton;
