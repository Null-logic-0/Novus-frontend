import { useDispatch, useSelector } from "react-redux";
import { formatCount } from "../helper/formatCount";
import { closeModal, openModal } from "../src/store/UI-slice";
import Modal from "./UI/Modal";
import FollowList from "./FollowList";
import { getFollowerUsers, getFollowingUsers } from "../util/http";
import { useCallback, useEffect } from "react";

const followConfigs = {
  followers: {
    title: "Followers",
    fetchUser: getFollowerUsers,
    queryKey: "followers",
    key: "followers",
  },
  following: {
    title: "Following",
    fetchUser: getFollowingUsers,
    queryKey: "following",
    key: "following",
  },
};

function FollowStats({ followers, following, userId }) {
  const dispatch = useDispatch();
  const activeModal = useSelector((state) => state.ui.activeModal);

  function openModalHandler(type) {
    dispatch(openModal(type));
  }

  const closeModalHandler = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  useEffect(() => {
    closeModalHandler();
  }, [closeModalHandler, userId]);

  const activeConfig = followConfigs[activeModal];

  return (
    <>
      <div className="flex gap-4 items-center pt-2">
        <button
          className="font-semibold text-sm opacity-50 cursor-pointer"
          onClick={() => openModalHandler("followers")}
        >
          {formatCount(followers, "follower")}
        </button>
        <button
          className="font-semibold text-sm opacity-50 cursor-pointer"
          onClick={() => openModalHandler("following")}
        >
          {formatCount(following, "following")}
        </button>
      </div>

      {activeConfig && (
        <Modal onClose={closeModalHandler}>
          <FollowList
            fetchUser={activeConfig.fetchUser}
            title={activeConfig.title}
            queryKey={activeConfig.queryKey}
            listKey={activeConfig.key}
            userId={userId}
          />
        </Modal>
      )}
    </>
  );
}

export default FollowStats;
