"use client";

import React from "react";
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
import { z } from "zod";
import FormFieldSchema from "../schema/form-field-schema";
import { Button } from "@/components/ui/button";
import ReservationSelectType from "./reservation-select-type";
import ReservationCalendar from "./reservation-calendar";
import ReservationAction from "./reservation-action";

const ReservationForm = () => {
  const { control } = useFormContext<z.infer<typeof FormFieldSchema>>();

  return (
    <div className="w-full flex flex-col gap-4 px-4 h-full pb-6 ">
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />

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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      <FormField
        name="schedule_id"
        control={control}
        render={({ field }) => {
          return (
            <FormItem>
              {/* <FormLabel>Jenis Reservasi</FormLabel> */}
              <FormControl>
                <ReservationCalendar
                  onChange={field.onChange}
                  values={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      <ReservationAction />
    </div>
  );
};

export default ReservationForm;
