import { Button } from "@components/button";
import { buttonBaseStyles, buttonTypes } from "@components/button/button.utils";
import { ProfileAvatar } from "@components/profile-avatar";
import { IUser } from "common";
import { Trash } from "lucide-react";
import { ChangeEvent, useState } from "react";

interface Props {
  user: IUser;
}

export function EditProfileAvatar({ user }: Props) {
  const [avatarPreview, setAvatarPreview] = useState<string>(
    user.imageUrl || "",
  );

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const file = target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileResult = e.target?.result?.toString();
      if (!fileResult) throw new Error("File result is empty");

      setAvatarPreview(fileResult);
    };

    reader.readAsDataURL(file);
  };

  function handleRemove() {
    setAvatarPreview("");
  }

  return (
    <div className="grid gap-4">
      <ProfileAvatar
        user={user}
        src={avatarPreview}
        showFallback={!avatarPreview}
      />
      <div className="grid justify-between self-center grid-cols-[auto_1fr] gap-4">
        <Button style="dangerOutline" onClick={handleRemove}>
          <Trash size={18} />
        </Button>
        <label
          htmlFor="file"
          className={`${buttonBaseStyles} ${buttonTypes.tertiary} text-center`}
        >
          Alterar
        </label>
        <input
          type="file"
          name="file"
          id="file"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
