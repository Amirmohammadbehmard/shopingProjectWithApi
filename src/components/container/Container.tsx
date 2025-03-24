interface Ichildren {
  children: React.ReactNode;
}

function Container({ children }: Ichildren) {
  return <div className="container mx-auto md:px-2 px-6">{children}</div>;
}

export default Container;
