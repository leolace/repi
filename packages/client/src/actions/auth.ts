"use server";
import { client } from "@services/client";
import { redirect } from "next/navigation";

export const createAccountAction = async (formData: FormData) => {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const classType = formData.get("class")?.toString();
  const password = formData.get("password")?.toString();
  const tags = formData.get("tags")?.toString().split(",").filter(Boolean);

  if (!name || !email || !classType || !password)
    return { errors: "Something is missing" };

  const res = await client("/auth", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      class: classType,
      password,
      tags,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.statusText !== "OK")
    return { errors: res.data, request: JSON.stringify(res) };

  redirect("/");
};
