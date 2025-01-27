import { Bixo, CompleteUser, IUser, Republica, UserClassesEnum } from "common";
import { LayoutGrid, User } from "lucide-react";
import { useMemo } from "react";

interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  alt?: string;
  className?: string;
  user: IUser | CompleteUser<Bixo | Republica>;
  src?: string;
  showFallback?: boolean;
}

export const ProfileAvatar = ({
  alt,
  className,
  user,
  src,
  showFallback,
  ...props
}: AvatarProps) => {
  const FallbackIcon =
    user.class === UserClassesEnum.REPUBLICA ? LayoutGrid : User;

  const AvatarImage = useMemo(() => {
    if (showFallback)
      return (
        <span className="text-gray-500 text-sm font-medium w-1/2 h-1/2 flex items-center justify-center">
          <FallbackIcon width="100%" height="100%" />
        </span>
      );

    if (src)
      return (
        <img
          src={src}
          alt={alt || `Avatar de ${user.name}`}
          className="w-full h-full object-cover"
        />
      );

    if (user.imageUrl)
      return (
        <img
          src={user.imageUrl}
          alt={alt || `Avatar de ${user.name}`}
          className="w-full h-full object-cover"
        />
      );

    return (
      <span className="text-gray-500 text-sm font-medium w-1/2 h-1/2 flex items-center justify-center">
        <FallbackIcon width="100%" height="100%" />
      </span>
    );
  }, [user, src, alt, showFallback]);

  return (
    <span
      className={`flex items-center justify-center min-h-4 min-w-4 w-full h-full rounded-full bg-gray-200 overflow-hidden ring-1 ring-gray-300 ${className} aspect-square`}
      title={`Avatar de ${user.name}`}
      {...props}
    >
      {AvatarImage}
    </span>
  );
};
