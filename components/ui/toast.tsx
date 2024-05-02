import React from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Button } from "./button";
import { FaCheckCircle } from "react-icons/fa";
import { VscError } from "react-icons/vsc";

type ICustomToast = {
  t: any;

  message: string;
  variant: string;
};

const CustomToast: React.FC<ICustomToast> = ({
  t,

  message,
  variant = "success",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="max-w-md w-full bg-white shadow-2xl radial-gradient-3 rounded-lg pointer-events-auto flex px-2"
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 pt-0.5">
            {variant === "success" && (
              <FaCheckCircle className="text-green-800 text-2xl" />
            )}

            {variant === "error" && (
              <VscError className="text-red-800 text-2xl" />
            )}
          </div>
          <div className="ml-3 flex-1">
            <p className="text-base font-black text-gray-900">
              {variant === "success" ? "Sukses" : "Error"}
            </p>
            <p className="mt-1 text-sm text-gray-500">{message}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <Button
          variant="accent-1"
          onClick={() => {
            toast.dismiss(t?.id);
          }}
        >
          Close
        </Button>
      </div>
    </motion.div>
  );
};

export default CustomToast;
