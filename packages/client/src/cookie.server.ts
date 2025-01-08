import { CookieSerializeOptions, createCookie } from "react-router";
import { MAX_SESSION_TIME_SEC } from "common";

export const sessionCookie = createCookie("user-session", {
  maxAge: MAX_SESSION_TIME_SEC,
});

export const getSessionCookie = async (request: Request) =>
  (await sessionCookie.parse(request.headers.get("Cookie"))) as string;

export const createSessionCookie = async (
  value: string,
  options?: CookieSerializeOptions,
) => await sessionCookie.serialize(value, options);

export const deleteSessionCookie = async () =>
  await sessionCookie.serialize("", { maxAge: -1 });
