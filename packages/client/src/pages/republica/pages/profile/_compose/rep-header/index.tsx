import { Button, ProfileAvatar, Text } from "@components";
import { Link } from "react-router";
import { useRepublicaProfileQuery } from "../../profile.queries";
import { useSession } from "@contexts/session";

export function RepHeader() {
  const { data: republica } = useRepublicaProfileQuery();
  const { user } = useSession();
  const isOwnerUser = user?.id === republica?.id;

  return (
    <header className="flex items-center">
      <div className="flex items-center gap-4 flex-1">
        <span className="w-40 h-40">
          <ProfileAvatar user={republica} />
        </span>
        <div className="flex-1">
          <Text size="3xl" weight="semibold">
            {republica?.name}
          </Text>
          <Text className="text-gray-400">São Carlos</Text>
        </div>
      </div>
      <div>
        {isOwnerUser ? (
          <Link to={`/republica/${republica?.id}/editar`}>
            <Button>Editar</Button>
          </Link>
        ) : (
          <Button>Interesse</Button>
        )}
      </div>
    </header>
  );
}
