import "./globals.css";
import { Rubik } from "next/font/google";
import { SessionContextContext } from "@contexts/session";
import { Header } from "@interfaces";

const rubik = Rubik({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <title>REPI</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/_public/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/_public/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/_public/favicon-16x16.png"
        />
        <link rel="manifest" href="/_public/site.webmanifest" />
      </head>
      <body
        className={`${rubik.className} w-full max-w-[60rem] px-2 mx-auto flex flex-col min-h-dvh`}
      >
        <SessionContextContext>
          <Header />
          <main className="flex-1 flex">{children}</main>
        </SessionContextContext>
      </body>
    </html>
  );
}
