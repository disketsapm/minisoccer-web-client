"use client";

import { Toaster } from "react-hot-toast";

export const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        className: "",
        duration: 5000,
        position: "top-right",
        style: {
          background: "#363636",
          color: "#fff",
        },

        success: {
          style: {
            background: "#10B981",
            color: "#fff",
          },
        },

        error: {
          style: {
            background: "#EF4444",
            color: "#fff",
          },
        },
      }}
    />
  );
};
