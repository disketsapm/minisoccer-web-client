import React from "react";
import UserProfile from "./components/user-profile";
import UserHistoryProfile from "./components/user-history";

const AuthMe = () => {
  return (
    <div
      className="flex w-full min-h-[70vh] py-14 px-12 gap-2"
      style={{
        backgroundImage: `url(/images/auth/bg-auth.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <UserProfile />

      <UserHistoryProfile />
    </div>
  );
};

export default AuthMe;
