import React from "react";
import { ButtonSizes, ButtonTypes, ButtonProps } from "./types";

export const Button = ({ children, type = "primary", size = "base", className, ...props }: ButtonProps) => {
  const buttonTypes: Record<ButtonTypes, string> = {
    primary: "bg-primary text-white active:bg-secondary",
    secondary: "text-carbon border border-gray active:border-secondary active:text-secondary",
  };

  const buttonSizes: Record<ButtonSizes, string> = {
		base: "text-base",
		lg: "text-lg",
		xl: "text-xl"
	};

  return (
    <button className={`py-1 px-4 outline-0 rounded font-semibold transition-colors ${buttonTypes[type]} ${buttonSizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

