import React, { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import idLocale from "@fullcalendar/core/locales/id";
import { formattedTime } from "@/utils/formatTime";

interface CalendarProps {
  events: any[];
}

const ColorIndicator = ({ status }: { status: string }) => {
  switch (status) {
    case "Available":
      return (
        <div
          className="w-3 h-3 rounded-full bg-green-500 mr-2"
          title="Available"
        ></div>
      );
    case "Maintenance":
      return (
        <div
          className="w-3 h-3 rounded-full bg-yellow-500 mr-2"
          title="Maintenance"
        ></div>
      );
    case "Unavailable":
      return (
        <div
          className="w-3 h-3 rounded-full bg-red-500 mr-2"
          title="Unavailable"
        ></div>
      );
    default:
      return null;
  }
};

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  console.log(events);

  const calendarRef = useRef<FullCalendar>(null);

  useEffect(() => {
    if (events.length === 0) return;
    if (calendarRef.current) {
      const firstEventDate = new Date(events[0]?.timeStart);
      calendarRef.current.getApi().gotoDate(firstEventDate);
    }
  }, [events]);

  const eventList = events.map((event, index) => ({
    start: event.timeStart,
    title: event.status,
    end: event.timeEnd,
    idSession: event._id,
    sessionName: event.session,
    price: event.price,
    dateSelected: new Date(event.date).toDateString(), // Get the date of the session
  }));

  return (
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
          <>
            <div className="w-full border bordsr-gray rounded flex justify-center items-center">
              <ColorIndicator status={arg.event.title} />
              <div>
                <p>{arg.event.extendedProps.sessionName}</p>
                <p>
                  {formattedTime(arg.event.startStr)} -{" "}
                  {formattedTime(arg.event.endStr)}
                </p>
              </div>
            </div>
          </>
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
  );
};

export default Calendar;
