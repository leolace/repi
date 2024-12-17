import { getSelf } from "@actions/user";
import { Card, Text } from "@components";
import React from "react";
import { LogOutButton } from "./logout-button.component";
import { ISelfUser, IUser } from "common";
import { isSelfUser } from "@utils/is-self-user";

export const UserCard = async ({ user }: { user: IUser | ISelfUser | null }) => {
  if (!user) return null;

  return (
    <Card>
      <Text>{user.name}</Text>
      <Text>{user.email}</Text>
      <Text>{user.class}</Text>
      <Text>{user.id}</Text>
      {isSelfUser(user) && <LogOutButton />}
    </Card>
  );
};
