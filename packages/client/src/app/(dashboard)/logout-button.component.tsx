"use client";

import { logOut } from "@actions";
import { Button } from "@components";

export const LogOutButton = () => {
  return <Button onClick={async () => await logOut()}>Sair</Button>;
};
