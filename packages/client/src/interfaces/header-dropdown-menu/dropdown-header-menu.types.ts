import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export enum MenuOptionsRoutes {
  PERFIL = "/perfil",
  CONFIGURACOES = "/configuracoes",
  REPUBLICA = "/minha-republica",
  INTERESSES = "/interesses",
  SAIR = "/sair",
}

export interface IMenuOptionLink {
  name: string;
  link: MenuOptionsRoutes;
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
