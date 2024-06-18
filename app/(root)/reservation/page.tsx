"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import ReservationForm from "./components/reservation-form";
import ModalInfoBooking from "./components/reservation-modal-info";
import FormFieldSchema from "./schema/form-field-schema";

const FieldView = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const methods = useForm<z.infer<typeof FormFieldSchema>>({
    resolver: zodResolver(FormFieldSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      schedule_id: [],
    },
  });

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <div className="w-full h-full radial-gradient-3">
      <ModalInfoBooking
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        title="Harga Sudah Termasuk Fotografer"
        description="Harga yang tercantum pada lapangan ini, sudah termasuk dengan harga jasa fotografer. Informasi lebih lanjut bisa hubungi pihak lapangan."
        imageSrc="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <div className="w-full h-full flex flex-col gap-3 md:container  relative">
        <div className="w-full h-full flex justify-center items-center py-8 flex-col">
          <div className="bg-gradient-to-b from-[#FFFFFF] to-[#FFFFFF00] flex flex-col gap-3 w-auto px-6 py-4 items-center rounded-xl">
            <p className="font-bold text-4xl text-center md:text-[50px]">
              Booking Lapangan
            </p>
            <p className="md:text-xs text-[10px] text-center">
              (Data ketersediaan lapang yang ditampilkan adalah data{" "}
              <b>real-time</b>)
            </p>
          </div>
        </div>

        <FormProvider {...methods}>
          <div className="w-full flex gap-2 h-full md:p-4 p-0 flex-col ">
            <ReservationForm />
          </div>
        </FormProvider>
      </div>
    </div>
  );
};

export default FieldView;
