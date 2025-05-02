import { useAuth } from "../hooks/useAuth";
import { useBlockUser } from "../hooks/useBlockUser";

import Button from "./UI/Button";

function BlockUser({ onCancel, userName, userId }) {
  const { token } = useAuth();

  const { isPending, mutate } = useBlockUser();

  function handleBlockUser() {
    mutate({ token, id: userId });
  }

  return (
    <div className="flex flex-col gap-2 items-center">
      <h2 className="text-white text-xl font-bold">Block {userName}?</h2>

      <p className="text-white opacity-50 text-sm font-semibold text-center">
        {userName} won't be able to find your profile or content on Threads or
        Instagram. No one will see their replies to your posts, and they won't
        be notified that you blocked them.
      </p>

      <div className="flex gap-2 justify-center items-center w-full pt-4">
        {!isPending && (
          <>
            <Button
              type="button"
              className="border-2 border-[#333333] max-w-30 text-white bg-[#171717] p-2"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button className="bg-white max-w-30 p-2" onClick={handleBlockUser}>
              Block
            </Button>
          </>
        )}
        {isPending && (
          <p className="opacity-50 font-semibold text-white">Please wait...</p>
        )}
      </div>
    </div>
  );
}

export default BlockUser;
