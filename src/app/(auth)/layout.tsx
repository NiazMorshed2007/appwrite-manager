import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-screen h-screen flex flex-col overflow-hidden items-center justify-center">
      {children}
    </main>
  );
};

export default AuthLayout;
