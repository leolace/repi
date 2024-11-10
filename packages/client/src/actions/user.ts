"use server";
import { client } from "@services/client";
import { IUser } from "common";

export const getUsers = async () => {
  const users = await client<IUser[]>("/users", { method: "GET" });
  return users.data;
};

export const getUserByEmail = async (email: string) => {
  const users = await client(`/users?email=${email}`, { method: "GET" });
  return users.data;
};
