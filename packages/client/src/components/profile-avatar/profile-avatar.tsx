import { HTMLAttributes } from "react";

export const ProfileAvatar = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span className={`flex w-full h-full min-w-4 min-h-4 rounded-full bg-gray-light ring-1 ring-gray ${className}`} {...props}/>
  );
};
