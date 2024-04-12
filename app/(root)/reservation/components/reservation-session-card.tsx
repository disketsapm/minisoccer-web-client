import { cn } from "@/lib/utils";
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
};

const ReservationSessionCard: React.FC<IReservationSessionCard> = ({
  startTime,
  endTime,
  onClick,
  status,
  sessionName,
  selected,
  isOnCalendar = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "border bordsr-gray  flex",
        { "bg-green-100": status === "Available" },
        { "bg-yellow-100": status === "Maintenance" },
        { "bg-red-100": status === "Unavailable" },
        {
          "bg-gray-100": selected,
          "w-full h-full justify-center items-center hover:bg-gray-100 cursor-pointer rounded ":
            isOnCalendar,

          "w-fit h-fit px-2 py-1 rounded-lg bg-black": !isOnCalendar,
        }
      )}
    >
      <div className="flex flex-col">
        <p
          className={cn({
            "text-xs text-black": isOnCalendar,
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
      </div>
    </div>
  );
};

export default ReservationSessionCard;
