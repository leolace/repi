import "./globals.css";
import { Rubik } from "next/font/google";

const rubik = Rubik({ weight: ["400", "500", "600", "700"], subsets: ["latin"] });

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
      <body className={`${rubik.className}`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
