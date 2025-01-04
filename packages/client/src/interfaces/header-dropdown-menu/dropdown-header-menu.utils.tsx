import { UserClassesEnum } from "common";
import {
  IMenuOptionClickable,
  MenuOption,
  MenuOptionsRoutes,
} from "./dropdown-header-menu.types";
import { Sparkle } from "lucide-react";

export const menuDropdownOptions: Record<UserClassesEnum, MenuOption[]> = {
  [UserClassesEnum.BIXO]: [
    {
      name: "Interesses",
      link: MenuOptionsRoutes.INTERESSES,
      Icon: Sparkle,
    },
  ],
  [UserClassesEnum.REPUBLICA]: [],
  [UserClassesEnum.NAO_DEFINIDA]: [],
};

export function isClickableMenuOption(
  value: MenuOption
): value is IMenuOptionClickable {
  return value && typeof value === "object" && "onClick" in value;
}
