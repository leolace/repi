import { authClient, client } from "@services/client.server";
import { ISelfUser, IUser, UserClassesEnum } from "common";
import { verifySession } from "./auth.server";
import { isErrorResponseData } from "@utils/is-error-response";
import { cache } from "react";
import { deleteSessionCookie } from "@cookie.server";
import { redirect } from "@remix-run/node";

export const getUsers = async () => {
  const users = await client<IUser[]>("/users");
  return users.data;
};

export const getSelf = cache(
  async (request: Request): Promise<ISelfUser | null> => {
    const session = await verifySession(request);
    if (!session) return null;

    // TODO: create a specific endpoint for self get/verify
    const users = await authClient<IUser[]>(`/users?id=${session.userId}`, {
      sessionToken: session.token,
    });

    if (isErrorResponseData(users.data)) return null;

    const user = users.data[0];
    if (!user)
      throw redirect("/", {
        headers: {
          "Set-Cookie": await deleteSessionCookie()
        },
      });

    const selfUser: ISelfUser = Object.assign(user, { session });

    return selfUser;
  }
);

export async function getUserById(userId: string) {
  const users = await client<IUser[]>(`/users?id=${userId}`);
  return users.data;
}

export const getUserByEmail = async (email: string) => {
  const users = await client<IUser[]>(`/users?email=${email}`);
  return users.data;
};

export const getUserByClass = async (classType: UserClassesEnum) => {
  const users = await client<IUser[]>(`/users?class=${classType}`);
  return users.data;
};
