import { Button, ProfileAvatar, Text } from "@components";
import { Link } from "react-router";
import { useGetRepublicaRouteData } from "@pages/republica/hooks/hooks";

export function RepHeader() {
  const { user, isOwnerUser } = useGetRepublicaRouteData();

  return (
    <header className="flex items-center">
      <div className="flex items-center gap-4 flex-1">
        <span className="w-40 h-40">
          <ProfileAvatar user={user} />
        </span>
        <div className="flex-1">
          <Text size="3xl" weight="semibold">
            {user.name}
          </Text>
          <Text className="text-gray-400">São Carlos</Text>
        </div>
      </div>
      <div>
        {isOwnerUser ? (
          <Link to={`/republica/${user.id}/editar`}>
            <Button>Editar</Button>
          </Link>
        ) : (
          <Button>Interesse</Button>
        )}
      </div>
    </header>
  );
}
