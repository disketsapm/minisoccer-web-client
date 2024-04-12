import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import idLocale from "@fullcalendar/core/locales/id";
import { formattedTime } from "@/utils/formatTime";
import { FieldService } from "@/services/field.service";
import { useQuery } from "@tanstack/react-query";
import { ISchedule } from "../type/reservation.type";
import { Skeleton } from "@/components/ui/skeleton";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

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
  onChange: (id: string[]) => void;
  values: string[];
};

const ReservationCalendar: React.FC<IReservationCalendar> = ({
  onChange,
  values,
}) => {
  const fieldService = new FieldService();

  const { getValues } = useFormContext();

  const fieldId = getValues("field_id");

  const { data, isLoading } = useQuery({
    queryKey: ["calendar-field"],
    queryFn: () =>
      fieldService.getSchedule({
        params: {
          search: fieldId,
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

  const eventList = events.map((event, index) => ({
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
    },
  }));

  const handleSetEvents = (id: string) => {
    let selectedItems = values;

    if (!values.includes(id)) {
      selectedItems = [...values, id];
    }

    if (values.includes(id)) {
      selectedItems = values.filter((item) => item !== id);
    }

    onChange(selectedItems);
  };

  return (
    <div className="w-full h-full relative">
      {isLoading && fieldId && <Skeleton className="w-full h-[650px]" />}

      {!isLoading && !fieldId && (
        <div className="w-full h-[650px] bg-gray-100 border flex text-center justify-center items-center  border-black rounded-sm text-sm font-semibold">
          Lapangan belum dipilih
        </div>
      )}

      {!isLoading && fieldId && (
        <>
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            timeZone="Asia/Jakarta"
            locale={idLocale}
            locales={[idLocale]}
            events={eventList}
            nowIndicator={false}
            headerToolbar={{
              left: "title",
              center: "",
              right: "prev,next",
            }}
            eventClick={(info) => console.log(info.event)}
            eventContent={(arg) => (
              <div
                onClick={() => handleSetEvents(arg?.event?.extendedProps?.id)}
                className={cn(
                  "w-full border bordsr-gray flex-shrink-0 flex-grow-0 rounded flex justify-center items-center h-full cursor-pointer hover:bg-gray-100",
                  { "bg-green-100": arg.event.title === "Available" },
                  { "bg-yellow-100": arg.event.title === "Maintenance" },
                  { "bg-red-100": arg.event.title === "Unavailable" },
                  {
                    "bg-gray-100": values.includes(arg.event.extendedProps.id),
                  }
                )}
              >
                <div className="flex flex-col">
                  <p className="text-sm text-black">
                    {arg.event.extendedProps.sessionName}
                  </p>
                  <p className="text-xs text-black">
                    {formattedTime(arg.event.startStr)} -{" "}
                    {formattedTime(arg.event.endStr)}
                  </p>
                </div>
              </div>
            )}
          />
          <div className="flex gap-5 mt-2">
            <div className="flex justify-center items-center">
              <ColorIndicator status="Available" /> Available
            </div>
            <div className="flex justify-center items-center">
              <ColorIndicator status="Maintenance" /> Maintenance
            </div>
            <div className="flex justify-center items-center">
              <ColorIndicator status="Unavailable" /> Unavailable
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReservationCalendar;
