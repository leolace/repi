import { cn } from "@utils/tailwind";
import {
  Bixo,
  CompleteSelfUser,
  CompleteUser,
  IUser,
  Republica,
  UserClassesEnum,
} from "common";
import { LayoutGrid, User } from "lucide-react";

interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  user: IUser | CompleteUser<Bixo | Republica> | CompleteSelfUser | undefined;
  src?: string;
  alt?: string;
  className?: string;
}

export const ProfileAvatar = ({
  user,
  src,
  className,
  ...props
}: AvatarProps) => {
  const FallbackIcon =
    user?.class === UserClassesEnum.REPUBLICA ? LayoutGrid : User;
  const imageUrl = src || user?.imageUrl;

  return (
    <span
      className={cn(
        "flex items-center justify-center min-h-4 min-w-4 w-full h-full rounded-full bg-gray-200 overflow-hidden ring-1 ring-gray-300 aspect-square",
        className,
      )}
      {...props}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={user ? `Avatar de ${user.name}` : "Imagem de avatar"}
          title={user?.name}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-gray-500 text-sm font-medium w-1/2 h-1/2 flex items-center justify-center">
          <FallbackIcon width="100%" height="100%" />
        </span>
      )}
    </span>
  );
};
