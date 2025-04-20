import ProfileAvatar from "./ProfileAvatar";
import Button from "./UI/Button";

function ProfileHeader() {
  return (
    <div className="w-full flex flex-col gap-12 p-6">
      <div className=" flex justify-between items-center ">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl">User Name</h1>
          <p className="font-semibold text-sm opacity-50">Followers 10k</p>
        </div>
        <ProfileAvatar className="w-20 h-20" />
      </div>
      <Button className="border-2 border-[#333333] text-white ">
        Edit Profile
      </Button>
    </div>
  );
}

export default ProfileHeader;
