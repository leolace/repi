import { isErrorResponseData } from "@utils/is-error-response";
import React from "react";
import { UserClassesEnum } from "common";
import { RepCard } from "@interfaces/rep-card/rep-card.compoenent";
import { getUserByClass } from "@actions/user.server";
import { useLoaderData } from "@remix-run/react";

export const loader = async () => {
  const users = await getUserByClass(UserClassesEnum.REPUBLICA);

  return { users };
};

export default function Home() {
  const { users } = useLoaderData<typeof loader>();

  if (isErrorResponseData(users)) return;
  return (
    <section className="flex-1 h-full w-full">
      <div className="grid gap-6">
        <pre className="grid gap-4">
          {users.map((user) => (
            <RepCard {...user} key={user.email} />
          ))}
        </pre>
      </div>
    </section>
  );
}
