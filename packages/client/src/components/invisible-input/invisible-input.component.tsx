import { InvisibleInputProps } from "./invisible-input.types";
import { mapTextSizes } from "@utils";

export const InvisibleInput = ({
  size = "2xl",
  className = "",
  ...props
}: InvisibleInputProps) => {
  return (
    <input
      className={`outline-none max-w-full w-full ${mapTextSizes[size]} ${className}`}
      {...props}
    />
  );
};
