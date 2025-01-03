import { UserClassesEnum } from "common";
import {
  IMenuOptionClickable,
  MenuOption,
  MenuOptionsRoutes
} from "./dropdown-header-menu.types";
import { LogOut, School, Settings, Sparkle, UserRound } from "lucide-react";
import { redirect } from "@remix-run/react";

export const menuDropdownOptions: Record<UserClassesEnum, MenuOption[]> = {
  [UserClassesEnum.BIXO]: [
    {
      name: "Perfil",
      link: MenuOptionsRoutes.PERFIL,
      Icon: UserRound,
    },
    {
      name: "Interesses",
      link: MenuOptionsRoutes.INTERESSES,
      Icon: Sparkle,
    },
  ],
  [UserClassesEnum.REPUBLICA]: [
    {
      name: "Minha república",
      link: MenuOptionsRoutes.REPUBLICA,
      Icon: School,
    },
  ],
  [UserClassesEnum.NAO_DEFINIDA]: [],
};

export const commonMenuDropdownOptions: MenuOption[] = [
  {
    name: "Configurações",
    link: MenuOptionsRoutes.CONFIGURACOES,
    Icon: Settings,
  },
  {
    name: "Sair",
    style: "text-red-600",
    Icon: LogOut,
    onClick: () => redirect("/sair"), //TODO: logout user
  },
];

export function isClickableMenuOption(value: MenuOption): value is IMenuOptionClickable {
  return value && typeof value === "object" && "onClick" in value;
}
