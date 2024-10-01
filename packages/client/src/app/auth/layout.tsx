const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="h-dvh w-full grid">
      <div className="mx-auto my-0 w-fit bg-gray-200 p-5 self-center rounded">
        {children}
      </div>
    </div>
  );
};

export default Layout;
