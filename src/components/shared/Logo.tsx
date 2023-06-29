import React from "react";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

const Logo: React.FC<Props> = ({ className }) => {
  return <img src="/logo.svg" className={`w-[60px] ${className}`} />;
};

export default Logo;
