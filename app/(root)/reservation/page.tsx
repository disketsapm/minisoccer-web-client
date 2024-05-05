"use client";

import React, { useEffect } from "react";
import ReservationGalery from "./components/reservation-galery";
import ReservationForm from "./components/reservation-form";
import { Form, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormFieldSchema from "./schema/form-field-schema";
import { z } from "zod";
import ModalInfoBooking from "./components/reservation-modal-info";

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
          <div className="bg-gradient-to-b from-[#FFFFFF] to-[#FFFFFF00] flex flex-col gap-3 w-[450px] px-6 py-4 items-center rounded-xl">
            <p className="font-bold text-4xl  md:text-[50px]">Booking Lapang</p>
            <p className="md:text-xs text-[10px] ">
              (Data ketersediaan lapang yang ditampilkan adalah data
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
