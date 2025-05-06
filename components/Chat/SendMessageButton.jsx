import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { useCreateChat } from "../../hooks/useCreateChat";

import Button from "../UI/Button";

function SendMessageButton({ userId }) {
  const { token } = useAuth();
  const navigate = useNavigate();

  const { mutate } = useCreateChat({
    onSuccess: (response) => {
      const chatId = response?.data?.chat?._id;
      if (chatId) {
        navigate(`/direct/inbox/${chatId}`);
      }
    },
  });

  function handleCreateChat() {
    mutate({ token, userIds: [userId] });
  }

  return (
    <Button
      onClick={handleCreateChat}
      className="border border-[#383838] text-white  tex-lg p-2 w-full text-lg"
    >
      Message
    </Button>
  );
}

export default SendMessageButton;
