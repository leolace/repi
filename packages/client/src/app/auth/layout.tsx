import { Header } from "@interfaces";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full max-w-[60rem] min-h-dvh px-2 mx-auto flex flex-col">
			<Header hideActions />
      <section className="flex-1 h-full flex items-center">
        {children}
      </section>
    </div>
  );
};

export default Layout;
