"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useLogout } from "@/hooks/auth/useLogout";
import {
  getFirstLetterAndLastName,
  getTokenFromLocalStorage,
} from "@/lib/utils";
import { AuthService } from "@/services/auth.service";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

import React, { useEffect, useState } from "react";

const UserProfile: React.FC<{ data: any; isLoading: boolean }> = ({
  data,
  isLoading,
}) => {
  const { mutateAsync, isPending } = useLogout();

  const [isDialogConfirmation, setIsDialogConfirmation] =
    useState<boolean>(false);

  return (
    <Card className="p-4 md:w-[250px] w-full bg-gradient-to-t from-[#FFFFFF] to-[#999999]  rounded-xl h-[fit-content] flex flex-col gap-2 items-center">
      {isLoading ? (
        <Skeleton className="w-[120px] h-[120px] rounded-full" />
      ) : (
        <Avatar className="w-[120px] h-[120px] font-semibold text-xl">
          <AvatarImage src={data?.photo} />
          <AvatarFallback>
            {data?.fullName ? getFirstLetterAndLastName(data?.fullName) : ""}
          </AvatarFallback>
        </Avatar>
      )}

      {isLoading ? (
        <Skeleton className="w-[120px] h-[30px]" />
      ) : (
        <p className="font-extrabold text-3xl text-center">{data?.fullName}</p>
      )}

      {isLoading ? (
        <Skeleton className="w-[120px] h-[30px]" />
      ) : (
        <p className="text-xs text-center">{data?.email}</p>
      )}

      <Button variant="accent-1" onClick={() => setIsDialogConfirmation(true)}>
        Logout
      </Button>

      <ConfirmationDialog
        content={
          <p className="py-4 px-2 text-sm font-semibold">
            Apakah Anda yakin ingin keluar dari aplikasi?
          </p>
        }
        isOpen={isDialogConfirmation}
        isLoading={isPending}
        onSubmit={async () => {
          await mutateAsync();
        }}
        submitTitle="Konfirmasi"
        title="Logout"
        onChange={() => setIsDialogConfirmation(false)}
      />
    </Card>
  );
};

export default UserProfile;
