import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Rubik } from "next/font/google";
import { Header } from "@interfaces";

const rubik = Rubik({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <html lang="pt-BR">
      <head>
        <title>REPI</title>
      </head>
      <body
        className={`${rubik.className} w-full max-w-[60rem] mx-auto flex flex-col min-h-dvh gap-12`}
      >
        <Header />
        <main className="flex-1 flex">{children}</main>
        <SpeedInsights />
      </body>
    </html>
  );
}
