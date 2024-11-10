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
      <body className={`${rubik.className} w-full max-w-[60rem] px-2 mx-auto flex flex-col min-h-dvh`}>
        <SessionContextContext>
          <Header />
          <main className="flex-1 flex">{children}</main>
        </SessionContextContext>
      </body>
    </html>
  );
}
