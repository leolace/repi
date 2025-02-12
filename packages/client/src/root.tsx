import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";
import appStylesHref from "./globals.css?url";
import { LinksFunction, LoaderFunctionArgs } from "react-router";
import { getSelf } from "./actions/user.server";
import { env } from "common/src/environment.server";
import { Main } from "@components/main/main.component";
import { Provider } from "@Provider";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getSelf(request);
  const { PUBLIC_API_ENDPOINT } = env;

  return { user, ENV: { PUBLIC_API_ENDPOINT } };
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
      <body>
        <Provider>
          <Main user={data.user}/>
        </Provider>
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
