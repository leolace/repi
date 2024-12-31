import { Text } from "@components";
import { Triangle } from "lucide-react";
import React from "react";
import { ProfileAvatar } from "../profile-avatar";
import { ISelfUser } from "common";
import {
  commonMenuDropdownOptions,
  menuDropdownOptions,
} from "./dropdown-header-menu.utils";
import { useDropdownHeaderMenu } from "./dropdown-header-menu.hooks";
import { DropdownItem } from "./_compose";

interface Props {
  showDropdown: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  user: ISelfUser;
}

const baseClass = "left-1/2 -translate-x-1/2 absolute transition duration-300";

export const DropdownHeaderMenu = ({
  showDropdown,
  setShowDropdown,
  user,
}: Props) => {
  const { isOpenClass, dropdownContainerRef } = useDropdownHeaderMenu({
    showDropdown,
    setShowDropdown,
  });

  return (
    <>
      <Triangle
        fill="#212121"
        size="0.75rem"
        strokeWidth="0.5px"
        className={`${baseClass} ${isOpenClass} bottom-0`}
      />
      <div
        className={`${baseClass} ${isOpenClass} ring-1 ring-gray-light min-w-[12rem] rounded flex flex-col gap-5 bg-gray-light-2`}
        ref={dropdownContainerRef}
      >
        <nav className="flex flex-col">
          <ul className="border-b-gray border-b p-2 py-4">
            <li className="flex gap-2 items-center">
              <span className="w-8 h-8 ">
                <ProfileAvatar className="flex-1" />
              </span>
              <Text>{user?.name}</Text>
            </li>
          </ul>
          <ul className="border-b-gray border-b grid">
            {menuDropdownOptions[user.class].map((item) => (
              <DropdownItem {...item} key={item.name} />
            ))}
          </ul>
          <ul className="grid">
            {commonMenuDropdownOptions.map((item) => (
              <DropdownItem {...item} key={item.name} />
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};
