import { FiMessageSquare } from "react-icons/fi";

function Empty({ text }) {
  return (
    <div className="flex flex-col gap-[16px] items-center justify-center">
      <FiMessageSquare className="text-[114px] text-[#747881]" />
      <p className="text-[#747881] text-[20px] font-medium">{text}</p>
    </div>
  );
}

export default Empty;
