import { Loader2 } from "lucide-react";
import React from "react";

type ILoader = {
  className?: string;
};

const Loader: React.FC<ILoader> = ({ className }) => (
  <Loader2 className={`animate-spin ${className} `}></Loader2>
);

export default Loader;
