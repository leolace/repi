import { LucideProps } from "lucide-react";
import type { Route } from "next";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export enum MenuOptionsRoute {
  PERFIL = "/perfil",
  CONFIGURACOES = "/configuracoes",
  REPUBLICA = "/republica",
  INTERESSES = "/interesses",
}

export interface IMenuOptionLink {
  name: string;
  link: Route<MenuOptionsRoute>;
  style?: string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

export interface IMenuOptionClickable {
  name: string;
  style?: string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  onClick: () => void;
}

export type MenuOption = IMenuOptionClickable | IMenuOptionLink;

export interface IDropdownHeaderMenuHookProps {
  showDropdown: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}
