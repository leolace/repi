import { CookieSerializeOptions, createCookie } from "@remix-run/node";

export const sessionCookie = createCookie("user-session", {
  maxAge: 999_999
});

export const getSessionCookie = async (request: Request) =>
  (await sessionCookie.parse(request.headers.get("Cookie"))) as string;

export const createSessionCookie = async (
  value: string,
  options?: CookieSerializeOptions
) => await sessionCookie.serialize(value, options);

export const deleteSessionCookie = async () =>
  await sessionCookie.serialize("", { maxAge: -1 });
