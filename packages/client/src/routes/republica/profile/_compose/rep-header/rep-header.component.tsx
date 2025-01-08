import { Button, ProfileAvatar, Text } from "@components";
import { Link } from "react-router";
import { useGetRepublicaRouteData } from "../../hooks";
import { Edit } from "lucide-react";

export function RepHeader() {
  const { user, republica, isOwnerUser } = useGetRepublicaRouteData();

  return (
    <header className="flex items-center">
      <div className="flex items-center gap-4 flex-1">
        <span className="w-20 h-20">
          <ProfileAvatar src={republica.imageUrl} user={user} />
        </span>
        <div className="flex-1">
          <Text size="3xl" className="font-medium">
            {user.name}
          </Text>
          <Text className="text-gray-400">São Carlos</Text>
        </div>
      </div>
      <div>
        {isOwnerUser ? (
          <Link to={`/republica/${user.id}/editar`}>
            <Button Icon={<Edit size={"20px"} />}>Editar</Button>
          </Link>
        ) : (
          <Button>Interesse</Button>
        )}
      </div>
    </header>
  );
}
