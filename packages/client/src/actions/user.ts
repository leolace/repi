"use server";
import { client } from "@services/client";
import { ISelfUser, IUser, UserClassesEnum } from "common";
import { verifySession } from "./auth";
import { isErrorResponse } from "@utils/is-error-response";

export const getUsers = async () => {
  const users = await client<IUser[]>("/users");
  return users.data;
};

export async function getSelf(): Promise<ISelfUser | null> {
  const session = await verifySession();
  if (!session) return null;

  const user = await getUserById(session.userId);

  if (isErrorResponse(user)) return null;

  return { ...user[0], session };
}

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
