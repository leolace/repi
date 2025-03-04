import { Button } from "@components/forms/button";
import {
  buttonBaseStyles,
  buttonTypes,
} from "@components/forms/button/button.utils";
import { Card, CardTitle } from "@components/card";
import { ProfileAvatar } from "@components/profile-avatar";
import { useUpdateAvatarProfilePic } from "@pages/republica/pages/edit/edit.queries";
import React, { ChangeEvent, FormEvent, MouseEvent, useRef, useState } from "react";
import { useSession } from "@contexts/session";

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EditProfileModal({ setIsOpen }: Props) {
  const { user } = useSession();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>();
  const containerRef = useRef<HTMLDivElement>(null);
  const { mutateAsync, isPending } = useUpdateAvatarProfilePic({
    onSuccess: () => {
      setSelectedFile(null);
    },
  });

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const file = target.files?.[0];
    if (!file) return;
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileResult = e.target?.result?.toString();
      if (!fileResult) throw new Error("File result is empty");

      setAvatarPreview(fileResult);
    };

    reader.readAsDataURL(file);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (e.target === containerRef.current) setIsOpen(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("teste");
    if (!selectedFile) throw new Error("Selected file is undefined.");
    await mutateAsync(selectedFile);
  };

  if (!user) return null;
  return (
    <div
      className="absolute left-0 top-0 bg-black/35 w-full h-full grid justify-center items-center"
      onClick={handleClickOutside}
      ref={containerRef}
    >
      <Card className="min-h-96 min-w-[35rem] grid">
        <CardTitle>Alterar foto de perfil</CardTitle>
        <span className="max-w-48 max-h-48 justify-self-center">
          <ProfileAvatar user={user} src={avatarPreview} />
        </span>
        <form
          className="flex w-full h-fit justify-between self-end"
          onSubmit={handleSubmit}
        >
          <Button onClick={() => setIsOpen(false)} style="secondary">
            Fechar
          </Button>
          <div className="flex gap-5">
            <label
              htmlFor="file"
              className={`${buttonBaseStyles} ${buttonTypes.secondary} text-center`}
            >
              Selecionar
            </label>
            <Button disabled={!avatarPreview} loading={isPending} type="submit">
              Salvar
            </Button>
          </div>
          <input
            type="file"
            name="file"
            id="file"
            className="hidden"
            accept="image/*"
            onChange={handleChange}
          />
        </form>
      </Card>
    </div>
  );
}
