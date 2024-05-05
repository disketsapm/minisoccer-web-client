import { Button } from "@/components/ui/button";
import { cn, formatCurrencyToIDR } from "@/lib/utils";
import { formattedTime } from "@/utils/formatTime";
import { useSearchParams } from "next/navigation";

import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

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
  const isLowerThanCurrentDate =
    new Date(startTime) < new Date() && isOnCalendar;

  const isClosed =
    status === "booked" ||
    status === "draft" ||
    status === "unavailable" ||
    isLowerThanCurrentDate;

  const RenderPrice = () => {
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

  const params = useSearchParams();

  const selectedScheduleIdInDetailBookingPage = isOnReschedulePage
    ? params?.get("schedule_id")
    : "";

  const isSelectedScheduleIdInDetailBookingPage =
    selectedScheduleIdInDetailBookingPage === currentScheduleId &&
    isOnReschedulePage;

  const renderLabelInBackdrop = () => {
    if (isClosed) {
      if (status === "booked") {
        return "Sudah Di Booking";
      }
      return "Ditutup";
    }
  };

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
        }
      )}
    >
      {isClosed && !isSelectedScheduleIdInDetailBookingPage ? (
        <div
          className={cn(
            "absolute w-full h-full flex items-center justify-center z-50 cursor-default rounded-sm ",
            {
              "bg-black/80": isClosed,
            }
          )}
        >
          <p className="font-semibold text-sm">{renderLabelInBackdrop()}</p>
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
          {/* 
            TODO: 
            - open yard asset picture in full size when clicked
            - open modal when changing jenis reservasi, just like initial modal (fotografer) but with different content (content to be created)
            - fix description ckeditor html value rendering
            - adjust map embed
            - when clicking [tentang kami, kerja sama, hubungi kami] ON BOOKING/RIWAYAT PAGE go back to home with the highlighted section

          */}

          <RenderPrice />
        </p>
      </div>
    </Button>
  );
};

export default ReservationSessionCard;
