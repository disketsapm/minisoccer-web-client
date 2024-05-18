import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import React from "react";
import { useFormContext } from "react-hook-form";

import ReservationCarousel from "./reservation-carousel";
import ReservationFacility from "./reservation-facility";
import useGetFieldById from "../hooks/useGetFieldById";

const ReservationGalery = () => {
  const { watch } = useFormContext();

  const fieldId = watch("field_id");

  const { data, isLoading } = useGetFieldById({
    key: ["field-galery", fieldId],
    enabled: !!fieldId,
  });

  return (
    <div className={cn("w-full h-full")}>
      {isLoading && fieldId && <Skeleton className="w-full h-[650px]" />}

      {!isLoading && !fieldId && (
        <div className="w-full h-[550px] flex justify-center items-center rounded-xl overflow-hidden radial-gradient-3   text-sm font-black shadow-sm">
          Lapangan Belum Dipilih
        </div>
      )}

      {!isLoading && fieldId && (
        <div className="h-full w-full flex flex-col gap-3">
          <ReservationCarousel data={data?.data?.assets || []} />

          <ReservationFacility
            description={data?.data?.yardDescription as string}
            data={data?.data?.yardFacilities || []}
            embededMap={data?.data?.yardLocationEmbed as string}
          />
        </div>
      )}
    </div>
  );
};

export default ReservationGalery;
