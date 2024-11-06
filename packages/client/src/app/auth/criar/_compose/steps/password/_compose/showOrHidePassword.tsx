import React from "react";
import { EyeOff, Eye } from "lucide-react";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ShowOrHidePassword = ({ setShow, show }: Props) => {
  return (
    <div
      onClick={() => setShow((prev) => !prev)}
      className="cursor-pointer p-3 hover:bg-gray-light rounded"
    >
      {show ? <Eye /> : <EyeOff />}
    </div>
  );
};
