import React from "react";
import { ButtonSizes, ButtonTypes, ButtonProps } from "./button.types";

export const Button = ({ children, type = "primary", size = "base", className, ...props }: ButtonProps) => {
  const buttonTypes: Record<ButtonTypes, string> = {
    primary: "bg-primary text-white active:bg-secondary border-2 border-primary active:border-secondary",
    secondary: "text-primary border-2 border-primary active:border-secondary active:text-secondary",
  };

  const buttonSizes: Record<ButtonSizes, string> = {
		base: "text-base",
		lg: "text-lg",
		xl: "text-xl"
	};

  return (
    <button className={`py-1 px-4 outline-0 rounded-md font-semibold min-w-24 transition-colors ${buttonTypes[type]} ${buttonSizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

