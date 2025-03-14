import { ProfileAvatar } from "@components/profile-avatar";
import { EditProfileModal } from "./modal";
import { Button } from "@components/forms/button";
import { useSession } from "@contexts/session";
import { openModal } from "@components/modal";

export function EditProfileAvatar() {
  const { user } = useSession();

  return (
    <>
      <div className="grid gap-4">
        <ProfileAvatar user={user} />
        <div className="grid justify-center self-center  gap-4">
          <Button onClick={() => openModal("edit-profile")}>Alterar foto</Button>
        </div>
      </div>
      <EditProfileModal />
    </>
  );
}
