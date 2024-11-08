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
      </head>
      <body className={`${rubik.className} w-full max-w-[60rem] min-h-dvh px-2 mx-auto flex flex-col`}>
        <SessionContextContext>
          <Header />
          <main>{children}</main>
        </SessionContextContext>
      </body>
    </html>
  );
}
