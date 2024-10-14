import React from "react";
import { mapTextSizes } from "@utils";
import { ButtonProps } from "./button.types";

export const Button = ({
  children,
  style = "primary",
  size = "base",
  className = "",
	type = "button",
	loading,
	disabled,
	ref,
  ...props
}: ButtonProps) => {
  const buttonTypes: Record<Types, string> = {
    primary: "bg-primary text-white border-2 border-primary",
    secondary:
      "text-primary border-2 border-primary active:border-secondary active:text-secondary",
    tertiary: "border",
  };

	const disabledStyle = disabled ? "opacity-75 cursor-not-allowed" : ""
	const loadingStyle = loading ? "opacity-75 cursor-wait" : ""
	
  return (
    <button
      className={`py-1 px-4 outline-0 rounded-md font-semibold min-w-24 transition-colors ${buttonTypes[style]} ${mapTextSizes[size]} ${disabledStyle} ${loadingStyle} ${className}`}
			disabled={disabled || loading}
			type={type}
			ref={ref}
      {...props}
    >
      {children}
    </button>
  );
};
