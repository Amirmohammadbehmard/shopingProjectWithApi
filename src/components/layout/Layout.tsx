import MyNavbar from "../navbar/MyNavbar";

interface Ichildren {
  children: React.ReactNode;
}

function Layout({ children }: Ichildren) {
  return (
    <>
      <MyNavbar />
      {children}
    </>
  );
}

export default Layout;
