import React from "react";
import Logo from "./Logo";

const PageLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-background flex items-center justify-center">
      <Logo className="w-[65px] h-[65px] animate-pulse" />
    </div>
  );
};

export default PageLoader;
