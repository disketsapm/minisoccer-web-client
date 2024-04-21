"use client";
import { Card } from "@/components/ui/card";
import React from "react";
import UserCardHistory from "./user-card-history";
import { useQuery } from "@tanstack/react-query";
import { AuthService } from "@/services/auth.service";

const UserHistoryProfile = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className=" p-4 rounded-xl h-[fit-content] w-fit  bg-gradient-to-b  from-[#FFFFFF] to-[#FFFFFF00] flex flex-col gap-2 items-center">
        <p className="font-black">Riwayat Booking</p>
      </div>

      <UserCardHistory />
    </div>
  );
};

export default UserHistoryProfile;
