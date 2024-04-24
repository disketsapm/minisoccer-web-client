"use client";

import React from "react";
import UserProfile from "./components/user-profile";
import UserHistoryProfile from "./components/user-history";
import { AuthService } from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import useGetHistoryUser from "./hooks/useGetHistoryUser";

const AuthMe = () => {
  const authService = new AuthService();

  const { data, isLoading } = useQuery({
    queryKey: ["user-me"],
    queryFn: () => authService.getUserDetail(),
  });

  return (
    <div className="flex w-full min-h-[70vh] flex-col md:flex-row  py-14 px-12 gap-2 radial-gradient-3">
      <UserProfile data={data} isLoading={isLoading} />

      <UserHistoryProfile userDetail={data} />
    </div>
  );
};

export default AuthMe;
