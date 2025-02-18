import { ProfileAvatar } from "@components/profile-avatar";
import { useState } from "react";
import { EditProfileModal } from "./_compose/modal";
import { Button } from "@components/forms/button";
import { useGetRootData } from "@hooks/use-get-root-data";

export function EditProfileAvatar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useGetRootData();

  if (!user) return;
  return (
    <>
      <div className="grid gap-4">
        <ProfileAvatar user={user} />
        <div className="grid justify-center self-center  gap-4">
          <Button onClick={() => setIsModalOpen(true)}>Alterar foto</Button>
        </div>
      </div>
      {isModalOpen && (
        <EditProfileModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      )}
    </>
  );
}
