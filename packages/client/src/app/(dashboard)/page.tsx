import { getSelf, getUserByClass, getUsers } from "@actions/user";
import { isErrorResponse } from "@utils/is-error-response";
import React from "react";
import { UserCard } from "./user-card";
import { UserClassesEnum } from "common";
import { RepCard } from "@interfaces/rep-card/rep-card.compoenent";

export const revalidate = 60;

const Home = async () => {
  const users = await getUserByClass(UserClassesEnum.REPUBLICA);
  const user = await getSelf();

  if (isErrorResponse(users)) return;
  return (
    <div className="grid gap-6">
      {user && <UserCard user={user} />}
      <pre className="grid gap-4">
        {users.map((user) => (
          <RepCard {...user} />
        ))}
      </pre>
    </div>
  );
};

export default Home;
