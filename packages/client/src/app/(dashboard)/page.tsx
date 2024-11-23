import { getUsers } from "@actions/user";
import { isErrorResponse } from "@utils/is-error-response";
import React from "react";
import { UserCard } from "./user-card";

export const revalidate = 60;

const Home = async () => {
  const users = await getUsers();

  if (isErrorResponse(users)) return;
  return (
    <div className="grid gap-6">
      <UserCard />
      <pre className="grid gap-4">
        {users.map((user) => (
          <div key={user.id}>
            <h1>{user.name}</h1>
            <p>{user.id}</p>
            <p>{user.email}</p>
            <p>{user.class}</p>
          </div>
        ))}
      </pre>
    </div>
  );
};

export default Home;
