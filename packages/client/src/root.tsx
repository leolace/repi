import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@interfaces";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import appStylesHref from "./globals.css?url";
import { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { getSelf } from "@actions/user.server";
import { env } from "common/src/environment.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getSelf(request);
  const { API_ENDPOINT } = env;

  console.log(user);
  return { user, ENV: { API_ENDPOINT } };
};

export default function Root() {
  const data = useLoaderData<typeof loader>();
  return (
    <html lang="pt-BR">
      <head>
        <title>REPI</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className={`w-full max-w-[60rem] mx-auto flex flex-col gap-12`}>
        <Header />
        <main className="flex-1 w-full">
          <Outlet />
        </main>
        <SpeedInsights />

        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}
