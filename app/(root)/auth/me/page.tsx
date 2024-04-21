import React from "react";
import UserProfile from "./components/user-profile";
import UserHistoryProfile from "./components/user-history";

const AuthMe = () => {
  return (
    <div className="flex w-full min-h-[70vh] flex-col md:flex-row  py-14 px-12 gap-2 radial-gradient-3">
      <UserProfile />

      <UserHistoryProfile />
    </div>
  );
};

export default AuthMe;
