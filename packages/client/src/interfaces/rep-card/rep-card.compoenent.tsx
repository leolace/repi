import { ProfileAvatar, Text } from "@components";
import { Link } from "react-router";
import { IUser } from "common";

export const RepCard = (user: IUser) => {
  return (
    <Link
      to={`/republica/${user.id}`}
      prefetch="intent"
      className="flex items-center gap-4"
    >
      <span className="w-16 h-16 flex">
        <ProfileAvatar user={user} />
      </span>
      <div>
        <Text size="xl">{user.name}</Text>
        <Text>{user.email}</Text>
        <Text size="sm">{user.id}</Text>
      </div>
    </Link>
  );
};
