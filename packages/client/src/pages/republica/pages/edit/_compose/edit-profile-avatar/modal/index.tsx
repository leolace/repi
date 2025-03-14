import {
  buttonBaseStyles,
  buttonTypes,
} from "@components/forms/button/button.utils";
import { ProfileAvatar } from "@components/profile-avatar";
import { useUpdateAvatarProfilePic } from "@pages/republica/pages/edit/edit.queries";
import { ChangeEvent, useState } from "react";
import { useSession } from "@contexts/session";
import { Modal } from "@components/modal";

export function EditProfileModal() {
  const { user } = useSession();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>();
  const { mutateAsync, isPending } = useUpdateAvatarProfilePic({
    onSuccess: () => {
      setSelectedFile(null);
    },
  });

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const file = target.files?.[0];
    if (!file) throw new Error("File is empty");
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileResult = e.target?.result?.toString();
      if (!fileResult) throw new Error("File result is empty");

      setAvatarPreview(fileResult);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile) throw new Error("Selected file is undefined.");
    await mutateAsync(selectedFile);
  };

  if (!user) return null;
  return (
    <Modal
      id="edit-profile"
      title="Alterar foto de perfil"
      subtitle="Escolha uma imagem"
      onConfirm={handleSubmit}
      loading={isPending}
    >
      <span className="justify-self-center grid gap-2">
        <ProfileAvatar
          user={user}
          src={avatarPreview}
          className="max-w-48 max-h-48"
        />
        <label
          htmlFor="file"
          className={`${buttonBaseStyles} ${buttonTypes.secondary} text-center`}
        >
          Selecionar
        </label>
      </span>
      <input
        type="file"
        name="file"
        id="file"
        className="hidden"
        accept="image/*"
        onChange={handleChange}
      />
    </Modal>
  );
}
