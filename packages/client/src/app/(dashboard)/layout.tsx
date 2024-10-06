import "../globals.css";
import { SessionContextContext } from "@contexts/session";
import { Header } from "@interfaces";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionContextContext>
      <main className="w-full max-w-[60rem] min-h-dvh px-2 mx-auto flex flex-col">
        <Header />
        <section className="flex-1 h-full w-full">{children}</section>
      </main>
    </SessionContextContext>
  );
}
