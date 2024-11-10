import { getUsers } from "@actions/user";
import React from "react";

export const revalidate = 60;

const Home = () => {
  const users = React.use(getUsers());

  return (
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
  );
};

export default Home;
