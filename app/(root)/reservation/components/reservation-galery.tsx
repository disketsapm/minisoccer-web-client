import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { FieldService } from "@/services/field.service";
import { useQuery } from "@tanstack/react-query";

import React from "react";
import { useFormContext } from "react-hook-form";

import ReservationCarousel from "./reservation-carousel";
import ReservationFacility from "./reservation-facility";

const ReservationGalery = () => {
  const { getValues } = useFormContext();

  const fieldService = new FieldService();

  const fieldId = getValues("field_id");

  const { data, isLoading } = useQuery({
    queryKey: ["field-galery", fieldId],
    queryFn: () =>
      fieldService.getFieldDetail({
        params: {
          _id: fieldId,
        },
      }),
    enabled: !!fieldId,
  });

  return (
    <div className={cn("w-[60%] h-[400px]", { "bg-gray-100": !fieldId })}>
      {isLoading && fieldId && <Skeleton className="w-full h-full" />}

      {!isLoading && !fieldId && (
        <div className="w-full h-full flex justify-center items-center border border-black rounded-sm text-sm font-semibold">
          Pilih lapangan terlebih dahulu
        </div>
      )}

      {!isLoading && fieldId && (
        <div className="w-full h-full ">
          <ReservationCarousel data={data?.data?.assets || []} />
          <ReservationFacility data={data?.data?.yardFacilities || []} />
        </div>
      )}
    </div>
  );
};

export default ReservationGalery;
