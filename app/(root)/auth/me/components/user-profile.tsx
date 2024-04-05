import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import React from "react";

const UserProfile = () => {
  return (
    <Card className="border-2 p-4 border-black rounded-xl h-[fit-content] flex flex-col gap-2 items-center">
      <Avatar>
        <AvatarFallback>MR</AvatarFallback>
      </Avatar>

      <p className="font-semibold text-lg text-center">Muhammad Rayandika</p>

      <Button variant="accent-2">Logout</Button>
    </Card>
  );
};

export default UserProfile;
