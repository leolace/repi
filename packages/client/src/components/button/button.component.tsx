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
    primary: "bg-primary text-white ring-1 ring-primary hover:bg-primary-dark disabled:hover:bg-primary",
    secondary: "text-carbon ring-1 ring-gray bg-gray-light-2 disabled:hover:bg-secondary",
    tertiary: "ring-0 ring-gray-light bg-transparent hover:bg-gray-light focus:shadow-none disabled:ring-1 disabled:hover:bg-transparent",
  };

  const disabledStyle = "disabled:opacity-75 disabled:cursor-not-allowed";
  const loadingStyle = loading ? "opacity-75 cursor-wait" : "";

  return (
    <button
      className={`px-3 py-1 outline-0 rounded font-medium min-w-24 focus:shadow-pressed ${buttonTypes[style]} ${mapTextSizes[size]} ${disabledStyle} ${loadingStyle} ${className}`}
      disabled={disabled || loading}
      type={type}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
};
