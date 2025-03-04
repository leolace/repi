import { ProfileAvatar } from "@components/profile-avatar";
import { DropdownHeaderMenu } from "@components/dropdown";
import { useState } from "react";
import { useSession } from "@contexts/session";
import { assembleDropdownItems } from "./utils";

export const HeaderMenu = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useSession();

  if (!user) return null;
  return (
    <div className="relative p-2">
      <div
        className="cursor-pointer w-12 h-12 bg-white select-none"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <ProfileAvatar user={user} />
      </div>
      <DropdownHeaderMenu
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        items={assembleDropdownItems(user)[user.class]}
      />
    </div>
  );
};
