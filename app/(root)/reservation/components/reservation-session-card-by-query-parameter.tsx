import React from "react";
import useGetScheduleIdByQueryParams from "../hooks/useGetScheduleIdByQueryParams";
import ReservationSessionCard from "./reservation-session-card";
import { Skeleton } from "@/components/ui/skeleton";

const ReservationSessionCardByQueryParamater = () => {
  const { data, isLoading } = useGetScheduleIdByQueryParams();

  if (isLoading) return <Skeleton className="w-[150px] h-[100px]" />;

  return (
    <ReservationSessionCard
      sessionName={data?.session as string}
      startTime={data?.timeStart?.toString() as string}
      endTime={data?.timeEnd?.toString() as string}
      price={data?.price?.toString()}
      isOnCalendar={false}
      finalPrice={data?.finalPrice?.toString()}
      isRescheduled={true}
    />
  );
};

export default ReservationSessionCardByQueryParamater;
