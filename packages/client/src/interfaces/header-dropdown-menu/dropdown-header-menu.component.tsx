import { Text } from "@components";
import { LogOut, Triangle } from "lucide-react";
import React from "react";
import { ProfileAvatar } from "@components/profile-avatar";
import { UserClassesEnum } from "common";
import { menuDropdownOptions } from "./dropdown-header-menu.utils";
import { useDropdownHeaderMenu } from "./dropdown-header-menu.hooks";
import { DropdownItem } from "./_compose";
import { MenuOptionsRoutes } from "./dropdown-header-menu.types";
import { Link } from "react-router";
import { useSession } from "@contexts/session";

interface Props {
  showDropdown: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const baseClass = "left-1/2 -translate-x-1/2 absolute transition duration-300";

export const DropdownHeaderMenu = ({
  showDropdown,
  setShowDropdown,
}: Props) => {
  const { isOpenClass, dropdownContainerRef } = useDropdownHeaderMenu({
    showDropdown,
    setShowDropdown,
  });
  const { user } = useSession();

  if (!user) return null;

  const userMenuOptions = menuDropdownOptions[user.class];
  const userPageLink =
    (user.class === UserClassesEnum.REPUBLICA ? "/republica/" : "/bixo/") +
    user.id;

  return (
    <>
      <Triangle
        fill="#212121"
        size="0.75rem"
        strokeWidth="0.5px"
        className={`${baseClass} ${isOpenClass} bottom-0`}
      />
      <div
        className={`${baseClass} ${isOpenClass} ring-1 ring-gray min-w-[12rem] top-14 rounded flex flex-col gap-5 bg-gray-light-2`}
        ref={dropdownContainerRef}
      >
        <nav className="flex flex-col">
          <ul className="border-b-gray border-b">
            <Link to={userPageLink}>
              <li
                className="flex gap-2 items-center hover:bg-gray-light p-2"
                title={user.name}
              >
                <span className="w-8 h-8">
                  <ProfileAvatar className="flex-1" user={user} />
                </span>
                <Text className="whitespace-nowrap overflow-hidden max-w-40 text-ellipsis">
                  {user.name}
                </Text>
              </li>
            </Link>
          </ul>
          {userMenuOptions.length ? (
            <ul className="border-b-gray border-b grid">
              {userMenuOptions.map((item) => (
                <DropdownItem {...item} key={item.name} />
              ))}
            </ul>
          ) : null}
          <ul className="grid">
            <DropdownItem
              link={MenuOptionsRoutes.SAIR}
              Icon={LogOut}
              name="Sair"
              style="text-red-600"
            />
          </ul>
        </nav>
      </div>
    </>
  );
};
