import { getUsers } from "@actions";
import React from "react";

const fetchUsers = async () => {
  const response = await fetch("http://localhost:9000/users/get");
  const json = await response.json();

  return json;
};

const Home = () => {
  const users = React.use(fetchUsers());

  return (
    <pre className="grid gap-4">
      {users.map((user) => (
        <div key={user.name}>
					<h1>{user.name}</h1>
					<p>{user.email}</p>
				</div>
      ))}
    </pre>
  );
};

export default Home;
