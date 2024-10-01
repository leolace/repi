import { Header } from "@components";
import "./globals.css";
import { Rubik } from "next/font/google";
import { SessionContextContext } from "@contexts/session";

const rubik = Rubik({ weight: ["400", "500", "600"], subsets: ["latin"] });

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
      <body className={`${rubik.className} w-full max-w-[60rem] px-2 mx-auto`}>
        <SessionContextContext>
          <Header />
          <main>{children}</main>
        </SessionContextContext>
      </body>
    </html>
  );
}
