import React from "react";
import useGetFieldById from "../hooks/useGetFieldById";
import { useFormContext } from "react-hook-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const ReservationAditionalItem = () => {
  const { getValues } = useFormContext();

  const fieldId = getValues("field_id");

  const schedule_id = getValues("schedule_id");

  const { data, isLoading } = useGetFieldById({
    key: ["aditional-item", fieldId],
    enabled: !!fieldId,
  });

  const isAdditionalItem = (data?.data?.additional_item?.length ?? 0) > 0;

  const isMinusDisabled = () => {
    const sessionSelected = schedule_id?.length;

    return sessionSelected === 0;
  };

  return (
    <div className="w-full h-full flex gap-2">
      {isLoading && !isAdditionalItem && (
        <Skeleton className="w-full h-[250px]" />
      )}
      {!isLoading &&
        isAdditionalItem &&
        data?.data?.additional_item?.map((item) => {
          return (
            <Card>
              <CardContent className="p-2 flex-col gap-2 flex">
                <img
                  className="w-full h-[240px] rounded-lg object-contain"
                  src={item?.url}
                />
                <p className="w-full text-center font-semibold">
                  {item?.name || ""}
                </p>
              </CardContent>

              <CardFooter>
                <div className="w-full justify-between flex gap-2 items-center">
                  <Button
                    className="rounded-full bg-[#45825A] text-center flex justify-center items-center"
                    disabled={isMinusDisabled()}
                  >
                    -
                  </Button>
                  <p>{schedule_id?.length}</p>
                  <Button className="rounded-full bg-[#45825A] text-center flex justify-center items-center">
                    +
                  </Button>
                </div>
              </CardFooter>
            </Card>
          );
        })}
    </div>
  );
};

export default ReservationAditionalItem;
