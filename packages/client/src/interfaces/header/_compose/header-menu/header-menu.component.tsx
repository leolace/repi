import { ProfileAvatar } from "../../../../components/profile-avatar/profile-avatar";
import { ISelfUser } from "common";
import { DropdownHeaderMenu } from "@interfaces/header-dropdown-menu";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigation } from "@remix-run/react";

export const HeaderMenu = (user: ISelfUser) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setShowDropdown(false);
  }, [pathname]);

  return (
    <div className="relative p-2">
      <div
        className="cursor-pointer w-10 h-10 bg-white select-none"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <ProfileAvatar />
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
