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
    <>
      <div className="w-full text-center font-bold text-[50px] py-10">
        Booking Lapang
      </div>

      <FormProvider {...methods}>
        <div className="w-full flex gap-2 h-full p-4 relative flex-col md:flex-row  items-center md:items-start  ">
          <ReservationGalery />
          <ReservationForm />
        </div>
      </FormProvider>
    </>
  );
};

export default FieldView;
