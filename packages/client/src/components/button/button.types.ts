import { HTMLAttributes } from "react";

export type ButtonTypes = "primary" | "secondary";
export type ButtonSizes = "base" | "lg" | "xl";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  type?: ButtonTypes;
  size?: ButtonSizes;
	className?: string;
}
