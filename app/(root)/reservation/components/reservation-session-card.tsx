import { Button } from "@/components/ui/button";
import { cn, formatCurrencyToIDR } from "@/lib/utils";
import { formattedTime } from "@/utils/formatTime";
import { useSearchParams } from "next/navigation";

import React, { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";

const renderLabelInBackdrop = (isClosed: boolean, status: string) => {
  if (isClosed) {
    if (status === "booked") {
      return "Sudah Di Booking";
    }
    return "Ditutup";
  }
};

type IReservationSessionCard = {
  status?: string;
  sessionName: string;
  startTime: string;
  endTime: string;
  onClick?: () => void;
  selected?: boolean;
  isOnCalendar?: boolean;
  price?: string;
  isOnReschedulePage?: boolean;
  finalPrice?: string;
  currentScheduleId?: string;
  isRescheduled?: boolean;
};

const ReservationSessionCard: React.FC<IReservationSessionCard> = ({
  startTime,
  endTime,
  onClick,
  status,
  sessionName,
  selected,
  isOnCalendar = false,
  price = "0",
  isOnReschedulePage,
  finalPrice = "0",
  currentScheduleId,
  isRescheduled,
}) => {
  const isLowerThanCurrentDate = useMemo(() => {
    return new Date(startTime) < new Date() && isOnCalendar;
  }, [startTime, isOnCalendar]);

  const isClosed = useMemo(() => {
    return (
      status === "booked" ||
      status === "draft" ||
      status === "unavailable" ||
      isLowerThanCurrentDate
    );
  }, [status, isLowerThanCurrentDate]);

  const params = useSearchParams();

  const selectedScheduleIdInDetailBookingPage = useMemo(() => {
    return isOnReschedulePage ? params?.get("schedule_id") : "";
  }, [params, isOnReschedulePage]);

  const isSelectedScheduleIdInDetailBookingPage = useMemo(() => {
    return (
      selectedScheduleIdInDetailBookingPage === currentScheduleId &&
      isOnReschedulePage
    );
  }, [
    selectedScheduleIdInDetailBookingPage,
    currentScheduleId,
    isOnReschedulePage,
  ]);

  return (
    <Button
      variant="disableOpacity"
      onClick={onClick}
      disabled={isClosed}
      className={cn(
        "border border-gray  flex w-full h-full p-5 text-center  transition-all  relative z-10 bg-white",
        {
          "bg-[#88FFB1] hover:bg-[#88FFB1] ": selected && isOnCalendar,
          "w-full h-[150px] justify-center items-center hover:bg-gray-100 cursor-pointer rounded":
            isOnCalendar,
        },
        {
          "w-[150px] h-[100px] px-6 py-1 rounded-lg bg-gradient-to-b from-[#45825A] to-[#364D48] cursor-default":
            !isOnCalendar && !isRescheduled,
        },

        {
          "w-[150px] h-[100px] px-6 py-1 rounded-lg bg-[#45825A] bg-opacity-50   cursor-default":
            !isOnCalendar && isRescheduled,
        },
        {
          "w-full h-[150px] justify-center items-center bg-gradient-to-b from-[#45825A] to-[#364D48]    cursor-pointer rounded":
            isClosed && isSelectedScheduleIdInDetailBookingPage,
        },
      )}
    >
      {isClosed && !isSelectedScheduleIdInDetailBookingPage ? (
        <div
          className={cn(
            "absolute w-full h-full flex items-center justify-center z-50 cursor-default rounded-sm ",
            {
              "bg-black/80": isClosed,
            },
          )}
        >
          <p className="font-semibold text-sm">
            {renderLabelInBackdrop(isClosed, status as string)}
          </p>
        </div>
      ) : null}

      <div className="flex flex-col">
        {isClosed && isSelectedScheduleIdInDetailBookingPage ? (
          <p className="text-sm text-white font-black ">Jadwal Sekarang</p>
        ) : null}

        <p
          className={cn({
            "text-xs text-black font-black": isOnCalendar,
            "text-[13px] text-white font-semibold text-center": !isOnCalendar,
            "text-white": isClosed && isSelectedScheduleIdInDetailBookingPage,
          })}
        >
          Sesi {sessionName}
        </p>
        <p
          className={cn({
            "text-xs text-black": isOnCalendar,
            "text-[10px] text-white text-center": !isOnCalendar,
            "text-white": isClosed && isSelectedScheduleIdInDetailBookingPage,
          })}
        >
          {formattedTime(startTime)} - {formattedTime(endTime)}
        </p>

        <p
          className={cn({
            "text-base text-black": isOnCalendar,
            "text-[10px] text-white text-center": !isOnCalendar,
            "text-white": isClosed && isSelectedScheduleIdInDetailBookingPage,
          })}
        >
          <RenderPrice price={Number(price)} finalPrice={Number(finalPrice)} />
        </p>
      </div>
    </Button>
  );
};

const RenderPrice: React.FC<{ price: number; finalPrice: number }> = ({
  price,
  finalPrice,
}) => {
  if (price > finalPrice) {
    return (
      <div className="flex flex-col gap-2">
        <p className="line-through text-xs">
          {formatCurrencyToIDR(Number(price))}
        </p>
        <p className="font-semibold text-sm">
          {formatCurrencyToIDR(Number(finalPrice))}
        </p>
      </div>
    );
  }

  if (price === finalPrice)
    return <p className="text-sm">{formatCurrencyToIDR(Number(price))}</p>;

  return <></>;
};

export default ReservationSessionCard;
