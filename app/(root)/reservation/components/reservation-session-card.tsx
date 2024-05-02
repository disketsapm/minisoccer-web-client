import { cn, formatCurrencyToIDR } from "@/lib/utils";
import { formattedTime } from "@/utils/formatTime";
import React from "react";

type IReservationSessionCard = {
  status?: string;
  sessionName: string;
  startTime: string;
  endTime: string;
  onClick?: () => void;
  selected?: boolean;
  isOnCalendar?: boolean;
  price?: string;
};

const ReservationSessionCard: React.FC<IReservationSessionCard> = ({
  startTime,
  endTime,
  onClick,
  status,
  sessionName,
  selected,
  isOnCalendar = false,
  price,
}) => {
  const isLowerThanCurrentDate =
    new Date(startTime) < new Date() && isOnCalendar;

  return (
    <div
      onClick={onClick}
      className={cn(
        "border border-gray  flex w-full h-full p-5 text-center  transition-all  relative z-10",
        { "bg-white": status === "Available" },
        { "bg-yellow-100": status === "Maintenance" },
        { "bg-red-100": status === "Unavailable" },
        {
          "bg-[#88FFB1]": selected,
          "w-full h-full justify-center items-center hover:bg-gray-100 cursor-pointer rounded ":
            isOnCalendar,
        },
        {
          "w-fit h-fit px-6 py-1 rounded-lg bg-gradient-to-b from-[#45825A] to-[#364D48]":
            !isOnCalendar,
        }
      )}
    >
      {isLowerThanCurrentDate ? (
        <div className="absolute w-full h-full bg-black/80 flex items-center justify-center z-50 cursor-default rounded-sm ">
          <p className="font-semibold text-sm">Ditutup</p>
        </div>
      ) : null}

      <div className="flex flex-col">
        <p
          className={cn({
            "text-xs text-black font-black": isOnCalendar,
            "text-[13px] text-white font-semibold text-center": !isOnCalendar,
          })}
        >
          {sessionName}
        </p>
        <p
          className={cn({
            "text-xs text-black": isOnCalendar,
            "text-[10px] text-white text-center": !isOnCalendar,
          })}
        >
          {formattedTime(startTime)} - {formattedTime(endTime)}
        </p>

        <p
          className={cn({
            "text-base text-black": isOnCalendar,
            "text-[10px] text-white text-center": !isOnCalendar,
          })}
        >
          {formatCurrencyToIDR(Number(price))}
        </p>
      </div>
    </div>
  );
};

export default ReservationSessionCard;
