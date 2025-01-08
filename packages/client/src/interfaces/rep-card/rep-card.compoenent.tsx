import { Text } from "@components";
import { Link } from "@remix-run/react";
import { IUser } from "common";

export const RepCard = ({ id, name, email }: IUser) => {
  return (
    <Link to={`/republica/${id}`}>
      <Text size="xl">{name}</Text>
      <Text>{email}</Text>
      <Text size="sm">{id}</Text>
    </Link>
  );
};
