"use client";

import React from "react";

import { Form, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import ReservationForm from "../components/reservation-form";
import FormFieldSchema from "../schema/form-field-schema";
import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ReservationService } from "@/services/reservation.service";
import { IScheduleArraySchema } from "../type/reservation.type";
import ModalInfoBooking from "../components/reservation-modal-info";

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

  const queryParams = useSearchParams();

  const schedule_id = queryParams.get("schedule_id");

  const [modalInfo, setModalInfo] = React.useState(false);

  React.useEffect(() => {
    setModalInfo(true);
  }, []);

  React.useEffect(() => {
    if (isSuccess && data?.data) {
      methods?.setValue("field_id", data?.data?.schedules?.[0]?.field_id);
      methods?.setValue("type", data?.data?.type);
      methods?.setValue("reservation_type", "reschedule");

      if (schedule_id) {
        const findIdByScheduleIdByParamater = data?.data?.schedules?.find(
          (schedule) => schedule?.schedule_id === schedule_id
        );

        if (findIdByScheduleIdByParamater) {
          methods?.setValue(
            "startDateReschedule",
            new Date(findIdByScheduleIdByParamater?.start_time)
          );
        }
      }
    }
  }, [isSuccess]);

  return (
    <div className="w-full h-full radial-gradient-3">
      <ModalInfoBooking
        description="Pada halaman ini, harap untuk memilih jadwal pengganti dari jadwal sebelumnya yang ditandai dengan warna hijau tua. Mohon untuk membuat pilihan dengan penuh pertimbangan karena kesempatan ini hanya tersedia sekali."
        isOpen={modalInfo}
        title="Anda Akan Melakukan Pengaturan Ulang Jadwal"
        onClose={() => setModalInfo(false)}
        imageSrc="https://images.unsplash.com/photo-1560420025-9453f02b4751?q=80&w=2501&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <div className="w-full h-full flex flex-col gap-3 md:container relative">
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
            <ReservationForm type="reschedule" data={data?.data} />
          </div>
        </FormProvider>
      </div>
    </div>
  );
};

export default FieldView;
