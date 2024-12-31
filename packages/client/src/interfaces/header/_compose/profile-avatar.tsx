import { HTMLAttributes } from "react";

export const ProfileAvatar = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span className={`flex w-full h-full rounded-full bg-gray-light ring-1 ring-gray ${className}`} {...props}/>
  );
};
