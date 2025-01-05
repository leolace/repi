import { CompleteSelfUser, IUser, UserClassesEnum } from "common";
import { LayoutGrid, User } from "lucide-react";

interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  className?: string;
  user: IUser | CompleteSelfUser;
}

export const ProfileAvatar = ({
  src,
  alt,
  className,
  user,
  ...props
}: AvatarProps) => {
  const FallbackIcon =
    user.class === UserClassesEnum.REPUBLICA ? LayoutGrid : User;

  return (
    <span
      className={`flex items-center justify-center min-h-4 min-w-4 w-full h-full rounded-full bg-gray-200 overflow-hidden ring-1 ring-gray-300 ${className}`}
      title={`Avatar de ${user.name}`}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt || `Avatar de ${user.name}`}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-gray-500 text-sm font-medium">
          <FallbackIcon />
        </span>
      )}
    </span>
  );
};
