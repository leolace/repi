import { getUsers } from "@actions";
import React from "react";

const Home = () => {
  const users = React.use(getUsers());

  return <pre>{JSON.stringify(users, null, 2)}</pre>;
};

export default Home;
