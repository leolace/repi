import React from "react";
import { mapTextSizes } from "@utils";
import { ButtonProps } from "./button.types";
import { buttonBaseStyles, buttonTypes, disabledStyle, isLoadingStyle } from "./button.utils";

export const Button = ({
  children,
  style = "primary",
  size = "base",
  className = "",
  type = "button",
  loading,
  disabled,
  ref,
  Icon,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${buttonBaseStyles} ${buttonTypes[style]} ${mapTextSizes[size]} ${disabledStyle} ${isLoadingStyle(loading)} ${className}`}
      disabled={disabled || loading}
      type={type}
      ref={ref}
      {...props}
    >
      {Icon ? (
        <span className="flex gap-2 items-center">
          {Icon}
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
};
