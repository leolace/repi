import { ProfileAvatar } from "@components/profile-avatar";
import { DropdownHeaderMenu } from "@interfaces/header-dropdown-menu";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useGetRootData } from "@hooks/use-get-root-data";

export const HeaderMenu = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { pathname } = useLocation();
  const { user } = useGetRootData();

  useEffect(() => {
    setShowDropdown(false);
  }, [pathname]);

  if (!user) return null;

  return (
    <div className="relative p-2">
      <div
        className="cursor-pointer w-10 h-10 bg-white select-none"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <ProfileAvatar user={user} src={user.classData.imageUrl} />
      </div>
      {showDropdown && (
        <DropdownHeaderMenu
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
          user={user}
        />
      )}
    </div>
  );
};
