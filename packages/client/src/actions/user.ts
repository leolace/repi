"use server";
import { client } from "@services/client";
import { IUser } from "common";

export const getUsers = async () => {
  const users = await client<IUser[]>("/users");
  return users.data;
};

export const getUserById = async (userId: string) => {
  const users = await client<IUser[]>(`/users?id=${userId}`);
  return users.data;
};

export const getUserByEmail = async (email: string) => {
  const users = await client<IUser[]>(`/users?email=${email}`);
  return users.data;
};
