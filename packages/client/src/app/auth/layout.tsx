const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="flex items-center self-center w-full">
      {children}
    </section>
  );
};

export default Layout;
