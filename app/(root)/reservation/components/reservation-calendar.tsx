import React, { useEffect, useMemo, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import idLocale from "@fullcalendar/core/locales/id";
import { formattedTime } from "@/utils/formatTime";
import { FieldService } from "@/services/field.service";
import { useQuery } from "@tanstack/react-query";
import { ISchedule } from "../type/reservation.type";
import { Skeleton } from "@/components/ui/skeleton";
import { useFormContext } from "react-hook-form";
import { addDays, cn } from "@/lib/utils";
import ReservationSessionCard from "./reservation-session-card";
import { Button } from "@/components/ui/button";
import {
  IOrderHistory,
  IScheduleHistory,
} from "../../auth/me/type/history.type";
import { useSearchParams } from "next/navigation";

const ColorIndicator = ({ status }: { status: string }) => {
  switch (status) {
    case "Available":
      return (
        <div
          className="w-3 h-3 flex-grow-0 flex-shrink-0  rounded-full bg-green-500 mr-2"
          title="Available"
        ></div>
      );
    case "Maintenance":
      return (
        <div
          className="w-3 h-3 flex-grow-0 flex-shrink-0  rounded-full bg-yellow-500 mr-2"
          title="Maintenance"
        ></div>
      );
    case "Unavailable":
      return (
        <div
          className="w-3 h-3 flex-grow-0 flex-shrink-0 rounded-full bg-red-500 mr-2"
          title="Unavailable"
        ></div>
      );
    default:
      return null;
  }
};

type IReservationCalendar = {
  onChange: (data: { id: string; startDate: Date; endDate: Date }[]) => void;
  values: { id: string; startDate: Date; endDate: Date }[];
  isOnReschedulePage?: boolean;
  detailData?: IOrderHistory;
};

const ReservationCalendar: React.FC<IReservationCalendar> = ({
  onChange,
  values,
  isOnReschedulePage,
  detailData,
}) => {
  const fieldService = new FieldService();

  const { getValues } = useFormContext();

  const fieldId = getValues("field_id");

  const queryParams = useSearchParams();

  const schedule_id = queryParams.get("schedule_id");

  const getScheduleDataByParameter = detailData?.schedules?.find(
    (schedule) => schedule?.schedule_id === schedule_id
  );

  const { data, isLoading } = useQuery({
    queryKey: [
      "calendar-field",
      fieldId,
      isOnReschedulePage,
      detailData?.total,
    ],
    queryFn: () =>
      fieldService.getSchedule({
        params: {
          search: fieldId,
          priceBelow: isOnReschedulePage
            ? getScheduleDataByParameter?.finalPrice
            : undefined,
        },
      }),
    enabled: !!fieldId,
  });

  const events = data?.data || [];

  const calendarRef = useRef<FullCalendar>(null);

  useEffect(() => {
    if (events?.length === 0) return;

    if (calendarRef.current) {
      const firstEventDate = new Date(events[0]?.timeStart);
      calendarRef.current.getApi().gotoDate(firstEventDate);
    }
  }, [events]);

  const eventList = useMemo(() => {
    return events.map((event, index) => ({
      start: event?.timeStart,
      title: event?.status,
      end: event?.timeEnd,
      idSession: event?._id,
      sessionName: event?.session,
      price: event?.price,
      dateSelected: new Date(event.date).toDateString(), // Get the date of the session
      display: "block",
      borderColor: "transparent",
      backgroundColor: "transparent",
      interactive: false,
      extendedProps: {
        id: event._id,
        price: event?.price,
        finalPrice: event?.finalPrice,
      },
    }));
  }, [events]);

  const handleSetEvents = ({
    id,
    startDate,
    endDate,
  }: {
    id: string;
    startDate: Date;
    endDate: Date;
  }) => {
    let selectedItems = values;

    const isExist = selectedItems.find((item) => item.id === id);

    if (isExist) {
      selectedItems = selectedItems.filter((item) => item.id !== id);
    } else {
      selectedItems.push({ id, startDate, endDate });
    }

    onChange(selectedItems);
  };

  return (
    <div className="w-full h-full  relative">
      {isLoading && fieldId && <Skeleton className="w-full h-[650px]" />}

      {!isLoading && fieldId && (
        <div className="md:w-full  h-full p-4 bg-[#DEDEDE] rounded-xl  relative">
          <div className="w-full h-full overflow-x-scroll md:overflow-auto">
            <div className="md:w-full h-full w-[1250px]">
              <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                timeZone="Asia/Jakarta"
                locale={idLocale}
                locales={[idLocale]}
                events={eventList}
                nowIndicator={false}
                showNonCurrentDates={false}
                height={"auto"}
                dayHeaderClassNames={["bg-black text-white"]}
                dayCellClassNames={["border border-black"]}
                headerToolbar={{
                  left: "title",
                  center: "",
                  right: "prev,next clear",
                }}
                customButtons={{
                  clear: {
                    text: "Clear",
                    click: () => {
                      onChange([]);
                    },
                  },
                }}
                eventContent={(arg) => (
                  <ReservationSessionCard
                    onClick={() => {
                      handleSetEvents({
                        id: arg.event.extendedProps.id,
                        startDate: new Date(arg.event.startStr),
                        endDate: new Date(arg.event.endStr),
                      });
                    }}
                    endTime={arg.event.startStr}
                    startTime={arg.event.endStr}
                    sessionName={arg.event.extendedProps.sessionName}
                    selected={Boolean(
                      values.find(
                        (item) => item.id === arg.event.extendedProps.id
                      )
                    )}
                    status={arg.event.title}
                    price={arg?.event?.extendedProps?.price}
                    isOnCalendar
                    finalPrice={arg?.event?.extendedProps?.finalPrice}
                    isOnReschedulePage={isOnReschedulePage}
                    currentScheduleId={arg?.event?.extendedProps?.id}
                  />
                )}
              />
            </div>
          </div>
          <div className="flex gap-5  flex-col md:flex-row mt-10">
            <div className="flex  text-xs md:text-base items-center">
              <ColorIndicator status="Available" /> Available
            </div>
            <div className="flex  text-xs md:text-base items-center">
              <ColorIndicator status="Maintenance" /> Maintenance
            </div>
            <div className="flex  text-xs md:text-base items-center">
              <ColorIndicator status="Unavailable" /> Unavailable
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationCalendar;
