import { config } from "@/config/config";
import React from "react";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

const Logo: React.FC<Props> = ({ className }) => {
  return (
    <img src={config.projectLogo} className={`object-cover ${className}`} />
  );
};

export default Logo;
