import { Loader2 } from "lucide-react";
import React from "react";

type ILoader = {
  className?: string;
  color?: string;
};

const Loader: React.FC<ILoader> = ({ className, color }) => (
  <Loader2 color={color} className={`animate-spin ${className} `}></Loader2>
);

export default Loader;
