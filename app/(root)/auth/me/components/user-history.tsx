"use client";
import { Card } from "@/components/ui/card";
import React from "react";
import UserCardHistory from "./user-card-history";
import { useQuery } from "@tanstack/react-query";
import { AuthService } from "@/services/auth.service";

const UserHistoryProfile = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      <Card className="border-2 p-4 border-black rounded-xl h-[fit-content] flex flex-col gap-2 items-center">
        <p className="font-semibold">Riwayat Booking</p>
      </Card>

      <UserCardHistory />
    </div>
  );
};

export default UserHistoryProfile;
