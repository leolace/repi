import { CompleteSelfUser, UserClassesEnum } from "common";
import { MenuOptionsRoutes } from "./types";
import { LogOut, Sparkle } from "lucide-react";
import { IDropdownItem } from "@components/dropdown/types";
import { ProfileAvatar, Text } from "@components";

export function assembleDropdownItems(
  user: CompleteSelfUser,
): Record<UserClassesEnum, IDropdownItem[][]> {
  return {
    [UserClassesEnum.BIXO]: [
      [
        {
          Component: (
            <div
              className="flex gap-2 items-center hover:bg-gray-light"
              title={user?.name}
            >
              <span className="w-8 h-8">
                <ProfileAvatar className="flex-1" user={user} />
              </span>
              <Text className="whitespace-nowrap overflow-hidden max-w-40 text-ellipsis">
                {user?.name}
              </Text>
            </div>
          ),
          link: assembleUserPagePath(user),
        },
      ],
      [
        {
          label: "Interesses",
          link: MenuOptionsRoutes.INTERESSES,
          Icon: Sparkle,
        },
      ],
      [
        {
          label: "Sair",
          link: "/auth/sair",
          Icon: LogOut,
        },
      ],
    ],
    [UserClassesEnum.REPUBLICA]: [
      [
        {
          Component: (
            <div
              className="flex gap-2 items-center hover:bg-gray-light"
              title={user?.name}
            >
              <span className="w-8 h-8">
                <ProfileAvatar className="flex-1" user={user} />
              </span>
              <Text className="whitespace-nowrap overflow-hidden max-w-40 text-ellipsis">
                {user?.name}
              </Text>
            </div>
          ),
          link: assembleUserPagePath(user),
        },
      ],
      [
        {
          label: "Sair",
          link: "/auth/sair",
          Icon: LogOut,
        },
      ],
    ],
    [UserClassesEnum.NAO_DEFINIDA]: [],
  };
}

export function assembleUserPagePath(user: CompleteSelfUser): string {
  return (
    (user.class === UserClassesEnum.REPUBLICA ? "/republica/" : "/bixo/") +
    user.id
  );
}
