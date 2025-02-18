import React from "react";
import { EyeOff, Eye } from "lucide-react";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

export const ShowOrHidePassword = ({ setShow, show, className }: Props) => {
  return (
    <div
      onClick={() => setShow((prev) => !prev)}
      className={`cursor-pointer p-2 hover:bg-gray-light rounded ${className}`}
    >
      {show ? <Eye /> : <EyeOff />}
    </div>
  );
};
