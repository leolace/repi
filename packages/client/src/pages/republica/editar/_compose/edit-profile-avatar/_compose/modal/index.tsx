import { Button } from "@components/button";
import { buttonBaseStyles, buttonTypes } from "@components/button/button.utils";
import { Card, CardTitle } from "@components/card";
import { ProfileAvatar } from "@components/profile-avatar";
import { useGetRootData } from "@hooks/use-get-root-data";
import { useUpdateAvatarProfilePic } from "@pages/republica/editar/query";
import React, { ChangeEvent, MouseEvent, useRef, useState } from "react";
import { Form } from "react-router";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EditProfileModal({ setIsOpen }: Props) {
  const { user } = useGetRootData();
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

  const handleSubmit = async () => {
    if (!selectedFile) throw new Error("Selected file is undefined.");
    await mutateAsync(selectedFile);
  };

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
        <Form
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
            <Button disabled={!avatarPreview} type="submit" loading={isPending}>
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
        </Form>
      </Card>
    </div>
  );
}
