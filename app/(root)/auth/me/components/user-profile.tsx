"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useLogout } from "@/hooks/auth/useLogout";
import { getTokenFromLocalStorage } from "@/lib/utils";
import { AuthService } from "@/services/auth.service";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const pathname = usePathname();
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

  const [dataUser, setDataUser] = useState({} as any);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const user = JSON.parse(localStorage.getItem("user") as string);
        if (user) {
          setDataUser(user);
        }
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
      }
    }
  }, [pathname]);

  return (
    <Card className="p-4 md:w-[250px] w-full bg-gradient-to-t from-[#FFFFFF] to-[#999999]  rounded-xl h-[fit-content] flex flex-col gap-2 items-center">
      {isLoading ? (
        <Skeleton className="w-[120px] h-[120px] rounded-full" />
      ) : (
        <Avatar className="w-[120px] h-[120px] font-semibold text-xl">
          <AvatarImage src={dataUser?.photo} />
          <AvatarFallback>
            {getFirstLetterAndLastName(data?.fullName)}
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

      <Button
        variant="accent-1"
        onClick={async () => await mutateAsync()}
        isLoading={isPending}
      >
        Logout
      </Button>
    </Card>
  );
};

export default UserProfile;
