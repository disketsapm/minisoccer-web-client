"use client";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import React, { useEffect, useState } from "react";
import ReservationSelectField from "./reservation-select-field";
import {
  FieldValues,
  Form,
  SubmitHandler,
  useFormContext,
} from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import ReservationSelectType from "./reservation-select-type";
import ReservationCalendar from "./reservation-calendar";
import ReservationAction from "./reservation-action";
import { IFormFieldSchema, ISchedule } from "../type/reservation.type";

import ReservationGalery from "./reservation-galery";
import { IOrderHistory } from "../../auth/me/type/history.type";

type IReservationForm = {
  type?: "default" | "reschedule";
  data?: IOrderHistory;
};

const ReservationForm: React.FC<IReservationForm> = ({
  type = "default",
  data,
}) => {
  const { control, getValues } = useFormContext<IFormFieldSchema>();

  const fieldId = getValues("field_id");
  const [refetchValue, setRefetchValue] = useState<number>(0);


  useEffect(() => {
    const duration = 5000; // 5 seconds
    let interval: NodeJS.Timeout;
    let startTime: number;

    const startInterval = () => {
      startTime = Date.now();
      interval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min((elapsedTime / duration) * 100, 100);
        setRefetchValue(progress);

        if (elapsedTime >= duration) {
          clearInterval(interval);
          // Reset refetchValue to 0 to loop the progress
          setRefetchValue(0);
        }
      }, 150); // Update every 50ms for smoother animation
    };

    startInterval();

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [refetchValue === 0]);
  return (
    <div className="w-full flex flex-col gap-6 px-4 h-full pb-6 relative ">
      <div className="w-full h-full flex-col md:flex-row flex gap-3">
        <div className="w-full h-full">
          <FormField
            name="field_id"
            control={control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Pilih Lapangan</FormLabel>
                  <FormControl>
                    <ReservationSelectField
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={type === "reschedule"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <div className="w-full h-full">
          <FormField
            name="type"
            control={control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Jenis Reservasi</FormLabel>
                  <FormControl>
                    <ReservationSelectType
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={type === "reschedule"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
      </div>

      <ReservationGalery />

      {fieldId ? (
        <div className="w-fit items-center flex gap-2 ">
          <p className="text-3xl font-black h-full w-full">
            Pilih Jadwal Booking
          </p>
          <div className='w-5 h-5'>
            <CircularProgressbar value={refetchValue} strokeWidth={50} className='w-full h-full' styles={buildStyles({
              textColor: '#f88',
              trailColor: '#d6d6d6',
              pathColor: "hsl(var(--primary))",
              backgroundColor: 'gray',
              strokeLinecap: "butt"
            })} />
          </div>
        </div>
      ) : null
      }

      <FormField
        name="schedule_id"
        control={control}
        render={({ field }) => {
          return (
            <FormItem>
              <FormControl>
                <ReservationCalendar
                  refetchValue={refetchValue}
                  onChange={field.onChange}
                  values={field.value}
                  detailData={data}
                  isOnReschedulePage={type === "reschedule"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      <ReservationAction
        isOnReschedulePage={type === "reschedule"}
        detailData={data}
      />
    </div >
  );
};

export default ReservationForm;
