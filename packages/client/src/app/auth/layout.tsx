const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="flex-1 h-full flex items-center min-h-dvh">
      {children}
    </section>
  );
};

export default Layout;
