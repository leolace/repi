import { InvisibleInputProps } from "./invisible-input.types";

export const InvisibleInput = ({ ...props }: InvisibleInputProps) => {
  return (
    <div>
      <input />
    </div>
  );
};
