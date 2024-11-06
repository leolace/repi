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
    primary: "bg-primary text-white ring-2 ring-primary",
    secondary:
      "text-primary ring-2 ring-primary active:border-secondary active:text-secondary",
    tertiary: "ring-2 ring-gray-light",
  };

	const disabledStyle = disabled ? "opacity-75 cursor-not-allowed" : ""
	const loadingStyle = loading ? "opacity-75 cursor-wait" : ""
	
  return (
    <button
      className={`py-1 px-4 outline-0 rounded font-semibold min-w-24 transition-colors ${buttonTypes[style]} ${mapTextSizes[size]} ${disabledStyle} ${loadingStyle} ${className}`}
			disabled={disabled || loading}
			type={type}
			ref={ref}
      {...props}
    >
      {children}
    </button>
  );
};
