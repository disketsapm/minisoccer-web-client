import CustomToast from "@/components/ui/toast";
import React from "react";
import toast from "react-hot-toast";

type IUseCustomToast = {
  message: string;
  variant: string;
};

const useCustomToast = () => {
  const openToast = ({ message, variant }: IUseCustomToast) => {
    toast.custom((t) => (
      <CustomToast t={t} message={message} variant={variant} />
    ));
  };

  return { openToast };
};

export default useCustomToast;
