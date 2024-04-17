"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useLogout } from "@/hooks/auth/useLogout";
import { getTokenFromLocalStorage } from "@/lib/utils";
import { AuthService } from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";

import React from "react";

const UserProfile = () => {
  const { mutateAsync, isPending } = useLogout();

  const authService = new AuthService();

  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: async () => authService.getUserDetail(),
  });

  const getFirstLetterAndLastName = (fullName: string) => {
    const name = fullName?.split(" ");
    return `${name?.[0]?.charAt(0)}${name?.[name?.length - 1].charAt(0)}`;
  };

  return (
    <Card className="border-2 p-4 md:w-[250px] w-full  border-black rounded-xl h-[fit-content] flex flex-col gap-2 items-center">
      {isLoading ? (
        <Skeleton className="w-[120px] h-[120px] rounded-full" />
      ) : (
        <Avatar className="w-[120px] h-[120px] font-semibold text-xl ">
          <AvatarFallback>
            {getFirstLetterAndLastName(data?.fullName)}
          </AvatarFallback>
        </Avatar>
      )}

      {isLoading ? (
        <Skeleton className="w-[120px] h-[30px]" />
      ) : (
        <p className="font-semibold text-lg text-center">{data?.fullName}</p>
      )}

      {isLoading ? (
        <Skeleton className="w-[120px] h-[30px]" />
      ) : (
        <p className="text-sm text-center">{data?.email}</p>
      )}

      <Button
        variant="accent-2"
        onClick={async () => await mutateAsync()}
        isLoading={isPending}
      >
        Logout
      </Button>
    </Card>
  );
};

export default UserProfile;
