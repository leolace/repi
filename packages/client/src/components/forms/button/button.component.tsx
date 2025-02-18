import React from "react";
import { mapTextSizes } from "@utils";
import { ButtonProps } from "./button.types";
import {
  buttonBaseStyles,
  buttonTypes,
  disabledStyles,
  getIsLoadingStyles,
  MapStyleToSpinnerBorderColor,
} from "./button.utils";
import { Spinner } from "@components/spinner";

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
  const content = Icon ? (
    <span className="flex gap-2 items-center">
      {Icon}
      {children}
    </span>
  ) : (
    children
  );

  return (
    <button
      className={`${buttonBaseStyles} ${buttonTypes[style]} ${mapTextSizes[size]} ${disabledStyles} ${getIsLoadingStyles(loading)} ${className}`}
      disabled={disabled || loading}
      type={type}
      ref={ref}
      {...props}
    >
      {loading ? <Spinner color={MapStyleToSpinnerBorderColor[style]} /> : content}
    </button>
  );
};
