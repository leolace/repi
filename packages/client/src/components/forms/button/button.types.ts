import { ButtonHTMLAttributes } from "react";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "style"> {
  children?: React.ReactNode;
  style?: Types;
  size?: Sizes;
  className?: string;
  loading?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
  Icon?: React.ReactNode;
}
