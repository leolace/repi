import { InputProps } from "./input.types";
import { mapTextSizes } from "@utils";

export const Input = ({
  size = "2xl",
  className = "",
  label,
  id,
  ...props
}: InputProps) => {
  return (
    <fieldset className={`grid gap-2 w-full ${className}`}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        className={`max-w-full w-full ${mapTextSizes[size]} border px-2 py-1 rounded`}
        {...props}
      />
    </fieldset>
  );
};
