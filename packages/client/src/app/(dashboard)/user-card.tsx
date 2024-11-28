import { getUser } from "@actions/user";
import { Card, Text } from "@components";
import React from "react";
import { LogOutButton } from "./logout-button.component";
import { IUser } from "common";

export const UserCard = async () => {
  // const [isPending, startTransaction] = React.useTransition();
  // const [user, setUser] = React.useState<null | IUser>(null);
  const user = await getUser();

  // React.useLayoutEffect(() => {
  //   startTransaction(async () => {
  //     setUser(await getUser());
  //   });
  // }, []);

  // if (isPending) return <div>loading...</div>;
  if (!user) return null;
  return (
    <Card>
      <Text>{user.name}</Text>
      <Text>{user.email}</Text>
      <Text>{user.class}</Text>
      <Text>{user.id}</Text>
      <LogOutButton />
    </Card>
  );
};
