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
import { cn } from "@/lib/utils";
import ReservationSessionCard from "./reservation-session-card";
import { Button } from "@/components/ui/button";

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

  const events = useMemo(() => data?.data || [], [data]);

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
      },
    }));
  }, [events]);

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

  const ClearButton = () => {
    return (
      <Button
        variant="accent-2"
        onClick={() => {
          onChange([]);
        }}
      >
        Clear
      </Button>
    );
  };
  return (
    <div className="w-full h-full  relative">
      {isLoading && fieldId && <Skeleton className="w-full h-[650px]" />}

      {!isLoading && fieldId && (
        <div className="md:w-full  h-full p-4 bg-[#DEDEDE] rounded-xl  relative">
          <div className="w-full h-full overflow-x-scroll md:overflow-auto">
            <div className="md:w-full h-full w-[800px]">
              <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                timeZone="Asia/Jakarta"
                locale={idLocale}
                locales={[idLocale]}
                events={eventList}
                nowIndicator={false}
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
                    onClick={() =>
                      handleSetEvents(arg?.event?.extendedProps?.id)
                    }
                    endTime={arg.event.startStr}
                    startTime={arg.event.endStr}
                    sessionName={arg.event.extendedProps.sessionName}
                    selected={values.includes(arg.event.extendedProps.id)}
                    status={arg.event.title}
                    price={arg?.event?.extendedProps?.price}
                    isOnCalendar
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
