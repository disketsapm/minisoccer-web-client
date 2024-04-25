"use client";

import React from "react";
import ReservationGalery from "./components/reservation-galery";
import ReservationForm from "./components/reservation-form";
import { Form, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormFieldSchema from "./schema/form-field-schema";
import { z } from "zod";

const FieldView = () => {
  const methods = useForm<z.infer<typeof FormFieldSchema>>({
    resolver: zodResolver(FormFieldSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      schedule_id: [],
    },
  });

  return (
    <div className="w-full h-full radial-gradient-3">
      <div className="w-full h-full flex flex-col gap-3 container relative">
        <div className="w-full h-full flex justify-center items-center py-8 flex-col">
          <div className="bg-gradient-to-b from-[#FFFFFF] to-[#FFFFFF00] flex flex-col gap-3 w-[450px] px-6 py-4 items-center rounded-xl">
            <p className="font-bold text-3xl  md:text-[50px]">Booking Lapang</p>
            <p className="md:text-xs text-[10px] ">
              (Data ketersediaan lapang yang ditampilkan adalah data{" "}
              <b>real-time</b>)
            </p>
          </div>
        </div>

        <FormProvider {...methods}>
          <div className="w-full flex gap-2 h-full p-4 flex-col ">
            <ReservationForm />
          </div>
        </FormProvider>
      </div>
    </div>
  );
};

export default FieldView;
