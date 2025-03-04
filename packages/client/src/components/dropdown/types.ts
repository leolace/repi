import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";

export interface DropdownProps {
  showDropdown: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  items: IDropdownItem[][];
}

export type IDropdownItem =
  | {
      link?: string;
      Icon?: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
      >;
      label: string;
      Component?: never;
    }
  | { Component: ReactNode, link?: string; Icon?: never; label?: never };
