import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";

import { queryClient, updateMe } from "../util/http";
import ImagePicker from "./ImagePicker";
import Button from "./UI/Button";
import FormUI from "./UI/FormUI";
import Input from "./UI/Input";
import ErrorBlock from "./UI/ErrorBlock";
import toast from "react-hot-toast";

function EditProfile({ onClose }) {
  const { userData, token } = useAuth();

  const profileImage = userData?.data?.user?.profileImage;
  const userDefaultImage =
    profileImage?.startsWith("http://") || profileImage?.startsWith("https://")
      ? profileImage
      : "../src/assets/default.jpg";

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: updateMe,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      onClose();
      toast.success("Profile updated successfully!");
    },
  });

  function handleUpdateUserInfo(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    mutate({ data: formData, token });
  }

  return (
    <FormUI className="gap-4" onSubmit={handleUpdateUserInfo}>
      <div className="flex w-full justify-center items-center gap-4">
        <div className="flex flex-col w-full gap-4">
          <Input
            type="text"
            name="fullName"
            className="p-2 text-sm"
            defaultValue={userData?.data?.user?.fullName ?? ""}
          />
          <Input
            type="email"
            name="email"
            disabled={true}
            className="p-2 text-sm cursor-not-allowed opacity-50"
            defaultValue={userData?.data?.user?.email ?? ""}
          />
        </div>
        <ImagePicker name="profileImage" defaultImage={userDefaultImage} />
      </div>

      <Input
        isTextarea={true}
        name="bio"
        className="resize-none h-30 text-sm"
        placeholder="Bio"
        defaultValue={userData?.data?.user?.bio ?? ""}
      />
      <Button className="bg-white" disabled={isPending}>
        {isPending ? "Submitting..." : "Done"}
      </Button>
      {isError && (
        <>
          <ErrorBlock
            title="Failed to update user data!"
            message={error.info?.message || "Invalid data provided"}
          />
        </>
      )}
    </FormUI>
  );
}

export default EditProfile;
