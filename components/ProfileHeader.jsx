import { useDispatch, useSelector } from "react-redux";
import { formatFollowers } from "../helper/formatFollowers";
import ProfileAvatar from "./ProfileAvatar";
import Button from "./UI/Button";
import { closeModal, openModal } from "../src/store/UI-slice";
import Modal from "./UI/Modal";
import EditProfile from "./EditProfile";

function ProfileHeader({ userData }) {
  const followers = userData?.data?.user?.followers?.length ?? 0;
  const activeModal = useSelector((state) => state.ui.activeModal);

  const dispatch = useDispatch();

  const openModalHandler = () => {
    dispatch(openModal("editProfile"));
  };
  const closeModalHandler = () => {
    dispatch(closeModal("editProfile"));
  };

  return (
    <>
      <div className="w-full flex flex-col gap-12 p-6">
        <div className=" flex justify-between items-center ">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl">
              {userData?.data?.user?.fullName}
            </h1>

            <p className="text-sm font-semibold text-white">
              {userData?.data?.user?.bio}
            </p>

            <p className="font-semibold text-sm opacity-50">
              {formatFollowers(followers)}
            </p>
          </div>
          <ProfileAvatar
            className="w-20 h-20"
            img={userData?.data?.user?.profileImage}
            alt={`${userData?.data?.user?.fullName}-avatar`}
          />
        </div>
        <Button
          className="border-2 border-[#333333] text-white "
          onClick={openModalHandler}
        >
          Edit Profile
        </Button>
      </div>
      {activeModal === "editProfile" && (
        <Modal onClose={closeModalHandler}>
          <EditProfile />
        </Modal>
      )}
    </>
  );
}

export default ProfileHeader;
