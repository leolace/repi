import { getUserById, getUsers } from "@actions/user";
import { isErrorResponse } from "@utils/is-error-response";
import { cookies } from "next/headers";
import React from "react";
import jwt from "jsonwebtoken";
import { getSession } from "@utils/get-session";

export const revalidate = 60;

const Home = async () => {
  const users = await getUsers();
  const session = await getSession();

  if (isErrorResponse(users)) return;
  return (
    <div>
      {session && (
        <pre>{JSON.stringify(await getUserById(session.userId), null, 2)}</pre>
      )}
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
