"use server";
import "server-only";
import { client } from "@services/client";
import { parseFormData } from "@utils/parse-formdata";
import { IToken, UserClassesEnum } from "common";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { isErrorResponse } from "@utils/is-error-response";

export const createAccountAction = async (formData: FormData) => {
  const name = parseFormData(formData, "name");
  const email = parseFormData(formData, "email");
  const classType = parseFormData(formData, "class");
  const password = parseFormData(formData, "password");
  let tags: string[] | undefined;

  if (classType === UserClassesEnum.BIXO) {
    tags = parseFormData(formData, "tags").split(",").filter(Boolean);
  }

  const res = await client("/auth", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      class: classType,
      password,
      tags,
    }),
  });

  if (res.statusText !== "OK")
    return { errors: res.data, request: JSON.stringify(res) };

  redirect("/");
};

export const login = async (_: unknown, formData: FormData) => {
  const email = parseFormData(formData, "email");
  const password = parseFormData(formData, "password");

  const res = await client<IToken>("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!res.ok || isErrorResponse(res.data))
    return { errors: res.data, request: JSON.stringify(res) };

  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const c = await cookies();
  c.set("session", res.data.token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  redirect("/");
};
