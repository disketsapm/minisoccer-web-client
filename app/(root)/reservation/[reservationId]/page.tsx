"use client";

import React from "react";

import { Form, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import ReservationForm from "../components/reservation-form";
import FormFieldSchema from "../schema/form-field-schema";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ReservationService } from "@/services/reservation.service";
import { IScheduleArraySchema } from "../type/reservation.type";

const FieldView = () => {
  const methods = useForm<z.infer<typeof FormFieldSchema>>({
    resolver: zodResolver(FormFieldSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      schedule_id: [],
    },
  });

  const params = useParams();

  const { reservationId } = params;

  const reservationService = new ReservationService();

  const { data, isSuccess } = useQuery({
    queryKey: ["reservation", reservationId],
    queryFn: async () =>
      reservationService?.getDetailReservation({
        _id: reservationId as string,
      }),
    enabled: !!reservationId,
  });

  React.useEffect(() => {
    if (isSuccess && data?.data) {
      console.log(methods?.getValues());

      methods?.reset({
        field_id: data?.data?.schedules?.[0]?.field_id,
        schedule_id: data?.data?.schedules?.map(
          (schedule: { _id: any; start_time: any; end_time: any }) => {
            return {
              id: schedule?._id,
              startDate: schedule?.start_time,
              endDate: schedule?.end_time,
            };
          }
        ),
        type: data?.data?.type,
      });
    }
  }, [isSuccess]);

  return (
    <div className="w-full h-full radial-gradient-3">
      <div className="w-full h-full flex flex-col gap-3 container relative">
        <div className="w-full h-full flex justify-center items-center py-8 flex-col">
          <div className="bg-gradient-to-b from-[#FFFFFF] to-[#FFFFFF00]  flex flex-col gap-3 w-[450px] px-6 py-4 items-center rounded-xl">
            <p className="font-black text-3xl  md:text-4xl">
              Atur Ulang Jadwal
            </p>
            <p className="md:text-xs text-[10px] ">
              (Data ketersediaan lapang yang ditampilkan adalah data{" "}
              <b>real-time</b>)
            </p>
          </div>
        </div>

        <FormProvider {...methods}>
          <div className="w-full flex gap-2 h-full p-4 flex-col ">
            <ReservationForm type="detail" />
          </div>
        </FormProvider>
      </div>
    </div>
  );
};

export default FieldView;
