import { Button, ProfileAvatar, Text } from "@components";
import { useRouteLoaderData } from "@remix-run/react";
import { RouteData } from "@routes/$userId/types";
import { Edit } from "lucide-react";

export function RepHeader() {
  const data = useRouteLoaderData<RouteData>("routes/$userId");

  return (
    <header className="flex items-center">
      <div className="flex items-center gap-4 flex-1">
        <span className="w-20 h-20">
          <ProfileAvatar />
        </span>
        <div className="flex-1">
          <Text size="3xl" className="font-medium">
            {data?.user.name}
          </Text>
          <Text className="text-gray-400">São Carlos</Text>
        </div>
      </div>
      <div>
        <Button Icon={<Edit size={"20px"} />}>Editar</Button>
      </div>
    </header>
  );
}
