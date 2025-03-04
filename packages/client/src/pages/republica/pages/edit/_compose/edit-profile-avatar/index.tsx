import { ProfileAvatar } from "@components/profile-avatar";
import { useState } from "react";
import { EditProfileModal } from "./modal";
import { Button } from "@components/forms/button";
import { useSession } from "@contexts/session";

export function EditProfileAvatar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSession();

  if (!user) return;
  return (
    <>
      <div className="grid gap-4">
        <ProfileAvatar user={user} />
        <div className="grid justify-center self-center  gap-4">
          <Button onClick={() => setIsModalOpen(true)}>Alterar foto</Button>
        </div>
      </div>
      {isModalOpen && <EditProfileModal setIsOpen={setIsModalOpen} />}
    </>
  );
}
