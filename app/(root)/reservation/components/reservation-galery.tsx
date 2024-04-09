import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { FieldService } from "@/services/field.service";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { useFormContext } from "react-hook-form";

const ReservationGalery = () => {
  const { getValues } = useFormContext();

  const fieldService = new FieldService();

  const fieldId = getValues("field");

  const { data, isLoading } = useQuery({
    queryKey: ["field-galery", fieldId],
    queryFn: () =>
      fieldService.getListField({
        params: {
          _id: fieldId,
        },
      }),
    enabled: !!fieldId,
  });

  return (
    <div className={cn("w-full h-[300px]", { "bg-gray-300": !fieldId })}>
      {isLoading && fieldId && <Skeleton className="w-full h-full" />}

      {!isLoading && fieldId && (
        <Image
          alt="image-galery"
          src={data?.data?.assets?.[0]?.url}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      )}
    </div>
  );
};

export default ReservationGalery;
