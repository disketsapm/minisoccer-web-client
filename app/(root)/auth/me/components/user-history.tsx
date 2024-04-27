"use client";
import { Card } from "@/components/ui/card";
import React from "react";
import UserCardHistory from "./user-card-history";
import { useQuery } from "@tanstack/react-query";
import { AuthService } from "@/services/auth.service";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import useGetHistoryUser from "../hooks/useGetHistoryUser";

const SKELETON_COUNT = 3;

const UserHistoryProfile: React.FC<{ userDetail: any }> = ({ userDetail }) => {
  const { data: historyUserData, isLoading: isLoadingHistoryUser } =
    useGetHistoryUser({
      search: userDetail?._id,
      key: [userDetail?._id],
      enabled: !!userDetail,
    });

  return (
    <div className="w-full flex flex-col gap-2">
      <div className=" p-4 rounded-xl h-[fit-content] md:w-fit w-full  bg-gradient-to-b  from-[#FFFFFF] to-[#FFFFFF00] flex flex-col gap-2 items-center">
        <p className="font-black">Riwayat Booking</p>
      </div>

      <div className="flex flex-col gap-2 w-full h-full">
        {!isLoadingHistoryUser && historyUserData?.data?.length === 0 && (
          <div className="w-full h-fit py-5 text-center radial-gradient-3 rounded-xl font-black text-sm ">
            Anda belum melakukan booking lapangan
          </div>
        )}

        {isLoadingHistoryUser && (
          <>
            {Array.from({ length: SKELETON_COUNT }).map((i, _index) => (
              <Skeleton
                key={_index}
                className="px-6 py-4 h-[340px] flex flex-col gap-3 rounded-xl"
              />
            ))}
          </>
        )}

        {!isLoadingHistoryUser &&
          historyUserData?.data?.map((item) => (
            <UserCardHistory historyUserData={item} key={item?._id} />
          ))}
      </div>
    </div>
  );
};

export default UserHistoryProfile;
