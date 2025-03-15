import { ProfileAvatar } from "@components/profile-avatar";
import { EditProfileModal } from "./modal";
import { Button } from "@components/forms/button";
import { useSession } from "@contexts/session";
import { openModal } from "@components/modal";
import { EDIT_PROFILE_AVATAR_MODAL_ID } from "../../edit.utils";

export function EditProfileAvatar() {
  const { user } = useSession();

  return (
    <>
      <div className="grid gap-4">
        <ProfileAvatar user={user} />
        <div className="grid justify-center self-center  gap-4">
          <Button onClick={() => openModal(EDIT_PROFILE_AVATAR_MODAL_ID)}>Alterar foto</Button>
        </div>
      </div>
      <EditProfileModal />
    </>
  );
}
