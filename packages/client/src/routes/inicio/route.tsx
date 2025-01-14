import { isErrorResponseData } from "@utils/is-error-response";
import React from "react";
import { UserClassesEnum } from "common";
import { RepCard } from "@interfaces/rep-card/rep-card.compoenent";
import { getUserByClass } from "@actions/user.server";
import { useLoaderData } from "react-router";
import { PageTitle } from "@components";

export const loader = async () => {
  const users = await getUserByClass(UserClassesEnum.REPUBLICA);

  return { users };
};

export default function Home() {
  const { users } = useLoaderData<typeof loader>();

  if (isErrorResponseData(users)) return;
  return (
    <section className="flex-1 h-full w-full grid gap-10">
      <PageTitle title="Encontre a sua república" />
      <div>
        <pre className="grid gap-8">
          {users.map((user) => (
            <RepCard {...user} key={user.email} />
          ))}
        </pre>
      </div>
    </section>
  );
}
