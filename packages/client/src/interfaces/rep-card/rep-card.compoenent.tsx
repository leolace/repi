import { Text } from "@components";
import { IUser } from "common";

export const RepCard = ({ name, email }: IUser) => {
  return <div>
    <Text size="xl">{name}</Text>
    <Text>{email}</Text>
  </div>;
};
