import { getUserByClass } from "@actions/user";
import { isErrorResponse } from "@utils/is-error-response";
import React from "react";
import { UserClassesEnum } from "common";
import { RepCard } from "@interfaces/rep-card/rep-card.compoenent";

export const revalidate = 60;

const Home = async () => {
  const users = await getUserByClass(UserClassesEnum.REPUBLICA);

  if (isErrorResponse(users)) return;
  return (
    <div className="grid gap-6">
      <pre className="grid gap-4">
        {users?.slice(0, 15).map((user) => (
          <RepCard {...user} key={user.email}/>
        ))}
      </pre>
    </div>
  );
};

export default Home;
