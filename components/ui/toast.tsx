import React from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Button } from "./button";

type ICustomToast = {
  t: any;
};

const CustomToast: React.FC<ICustomToast> = ({ t }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="max-w-md w-full bg-white shadow-2xl radial-gradient-3 rounded-lg pointer-events-auto flex px-2"
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <img
              className="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
              alt=""
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">Emilia Gates</p>
            <p className="mt-1 text-sm text-gray-500">
              Sure! 8:30pm works great!
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <Button
          variant="accent-1"
          onClick={() => {
            toast.dismiss(t.id);
          }}
        >
          Close
        </Button>
      </div>
    </motion.div>
  );
};

export default CustomToast;
