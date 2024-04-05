import { Card } from "@/components/ui/card";
import React from "react";
import UserCardHistory from "./user-card-history";

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
