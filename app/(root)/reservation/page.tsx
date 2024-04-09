"use client";

import React from "react";
import ReservationGalery from "./components/reservation-galery";
import ReservationForm from "./components/reservation-form";
import { Form, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormFieldSchema from "./schema/form-field-schema";

const FieldView = () => {
  const methods = useForm({
    resolver: zodResolver(FormFieldSchema),
    mode: "onChange",
  });

  return (
    <>
      <div className="w-full text-center font-semibold text-2xl py-10">
        Booking Lapang
      </div>

      <FormProvider {...methods}>
        <div className="w-full flex gap-2 h-[100vh] px-4 ">
          <ReservationGalery />
          <ReservationForm />
        </div>
      </FormProvider>
    </>
  );
};

export default FieldView;
