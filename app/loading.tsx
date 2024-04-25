"use client";

import Loader from "@/components/ui/loader";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-white flex-col gap-12">
      <div className="flex items-center justify-center ">
        <Image
          src="/images/logo.png"
          alt="Hero"
          layout="responsive"
          width={1600}
          height={900}
          priority
        />
      </div>

      <Loader className="h-56 w-56" color="#45825A" />
    </div>
  );
}
