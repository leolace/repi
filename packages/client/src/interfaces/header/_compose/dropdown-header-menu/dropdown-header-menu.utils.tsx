import { UserClassesEnum } from "common";
import {
  IMenuOptionClickable,
  MenuOption,
  MenuOptionsRoute,
} from "./dropdown-header-menu.types";
import { LogOut, School, Settings, Sparkle, UserRound } from "lucide-react";
import { logout } from "@actions";

export const menuDropdownOptions: Record<UserClassesEnum, MenuOption[]> = {
  [UserClassesEnum.BIXO]: [
    {
      name: "Perfil",
      link: MenuOptionsRoute.PERFIL,
      Icon: UserRound,
    },
    {
      name: "Interesses",
      link: MenuOptionsRoute.INTERESSES,
      Icon: Sparkle,
    },
  ],
  [UserClassesEnum.REPUBLICA]: [
    {
      name: "Minha república",
      link: MenuOptionsRoute.REPUBLICA,
      Icon: School,
    },
  ],
  [UserClassesEnum.NAO_DEFINIDA]: [],
};

export const commonMenuDropdownOptions: MenuOption[] = [
  {
    name: "Configurações",
    link: "/configuracoes",
    Icon: Settings,
  },
  {
    name: "Sair",
    style: "text-red-600",
    Icon: LogOut,
    onClick: () => logout(),
  },
];

export function isClickableMenuOption(value: MenuOption): value is IMenuOptionClickable {
  return value && typeof value === "object" && "onClick" in value;
}
